import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// Initialize Redis with KV_URL
const redis = new Redis({
  url: process.env.KV_URL || '',
  token: '', // Not needed for Redis Labs URL
});

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
    
    // Save to Redis KV
    await redis.set(`order:${orderData.orderId}`, JSON.stringify(orderData));
    await redis.lpush('orders:list', orderData.orderId);
    
    console.log('✅ Order saved to KV:', orderData.orderId);
    
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
    const orderIds: string[] = await redis.lrange('orders:list', 0, -1) || [];
    
    if (orderIds.length === 0) {
      return NextResponse.json(
        { success: true, data: [] },
        { status: 200, headers: corsHeaders }
      );
    }
    
    const orders = await Promise.all(
      orderIds.map(async (id) => {
        const data = await redis.get(`order:${id}`);
        return typeof data === 'string' ? JSON.parse(data) : data;
      })
    );
    
    const validOrders = orders
      .filter(Boolean)
      .sort((a: any, b: any) => 
        new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
    
    console.log('📦 Fetched orders from KV:', validOrders.length);
    
    return NextResponse.json(
      { success: true, data: validOrders },
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
    
    await redis.del(`order:${orderId}`);
    await redis.lrem('orders:list', 0, orderId);
    
    console.log('🗑️ Order deleted from KV:', orderId);
    
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
    
    const data = await redis.get(`order:${orderId}`);
    const order = typeof data === 'string' ? JSON.parse(data) : data;
    
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404, headers: corsHeaders }
      );
    }
    
    order.status = status;
    await redis.set(`order:${orderId}`, JSON.stringify(order));
    
    console.log('✏️ Status updated in KV:', orderId, status);
    
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