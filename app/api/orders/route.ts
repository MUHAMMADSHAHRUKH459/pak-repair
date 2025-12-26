import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

// Initialize Redis client
let redis: Redis | null = null;

function getRedisClient() {
  if (!redis) {
    const redisUrl = process.env.KV_URL || process.env.REDIS_URL;
    if (redisUrl) {
      redis = new Redis(redisUrl);
    }
  }
  return redis;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// POST: Save order
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    const client = getRedisClient();
    
    if (!client) {
      throw new Error('Redis client not initialized');
    }
    
    // Save to Redis
    await client.set(`order:${orderData.orderId}`, JSON.stringify(orderData));
    await client.lpush('orders:list', orderData.orderId);
    
    console.log('✅ Order saved to Redis:', orderData.orderId);
    
    return NextResponse.json(
      { success: true, data: orderData },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// GET: Fetch all orders
export async function GET() {
  try {
    const client = getRedisClient();
    
    if (!client) {
      throw new Error('Redis client not initialized');
    }
    
    // Get all order IDs
    const orderIds = await client.lrange('orders:list', 0, -1);
    
    if (orderIds.length === 0) {
      return NextResponse.json(
        { success: true, data: [] },
        { status: 200, headers: corsHeaders }
      );
    }
    
    // Fetch all orders
    const ordersData = await Promise.all(
      orderIds.map(id => client.get(`order:${id}`))
    );
    
    // Parse and sort
    const orders = ordersData
      .filter(Boolean)
      .map(data => JSON.parse(data as string))
      .sort((a, b) => 
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
    
    console.log('📦 Fetched orders from Redis:', orders.length);
    
    return NextResponse.json(
      { success: true, data: orders },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE: Remove order
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    
    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID required' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    const client = getRedisClient();
    
    if (!client) {
      throw new Error('Redis client not initialized');
    }
    
    // Delete from Redis
    await client.del(`order:${orderId}`);
    await client.lrem('orders:list', 0, orderId);
    
    console.log('🗑️ Order deleted from Redis:', orderId);
    
    return NextResponse.json(
      { success: true },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// PATCH: Update status
export async function PATCH(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();
    
    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing data' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    const client = getRedisClient();
    
    if (!client) {
      throw new Error('Redis client not initialized');
    }
    
    // Get existing order
    const data = await client.get(`order:${orderId}`);
    
    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404, headers: corsHeaders }
      );
    }
    
    const order = JSON.parse(data);
    order.status = status;
    
    // Update in Redis
    await client.set(`order:${orderId}`, JSON.stringify(order));
    
    console.log('✏️ Status updated in Redis:', orderId, status);
    
    return NextResponse.json(
      { success: true, data: order },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}