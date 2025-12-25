import { NextRequest, NextResponse } from 'next/server';

// Fallback storage
let ordersStore: any[] = [];

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

// MongoDB optional import (won't crash if missing)
let connectDB: any = null;
let Order: any = null;

try {
  connectDB = require('@/lib/mongodb').default;
  Order = require('@/models/Order').default;
} catch (e) {
  console.log('⚠️ MongoDB modules not available, using in-memory storage');
}

// POST: Create new order
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    // Try MongoDB first
    if (connectDB && Order) {
      try {
        await connectDB();
        const order = await Order.create(orderData);
        console.log('✅ Order saved to MongoDB:', orderData.orderId);
        
        return NextResponse.json(
          { success: true, data: order },
          { status: 201, headers: corsHeaders }
        );
      } catch (dbError) {
        console.error('⚠️ MongoDB error, using fallback:', dbError);
      }
    }
    
    // Fallback to in-memory
    ordersStore.push(orderData);
    console.log('✅ Order saved to memory:', orderData.orderId);
    
    return NextResponse.json(
      { success: true, data: orderData },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('❌ Error saving order:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// GET: Fetch all orders
export async function GET(request: NextRequest) {
  try {
    // Try MongoDB first
    if (connectDB && Order) {
      try {
        await connectDB();
        const orders = await Order.find().sort({ createdAt: -1 });
        console.log('📦 Fetched orders from MongoDB:', orders.length);
        
        return NextResponse.json(
          { success: true, data: orders },
          { status: 200, headers: corsHeaders }
        );
      } catch (dbError) {
        console.error('⚠️ MongoDB error, using fallback:', dbError);
      }
    }
    
    // Fallback to in-memory
    console.log('📦 Fetching orders from memory:', ordersStore.length);
    
    return NextResponse.json(
      { success: true, data: ordersStore },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('❌ Error fetching orders:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// DELETE: Delete specific order
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
    
    // Try MongoDB first
    if (connectDB && Order) {
      try {
        await connectDB();
        await Order.findOneAndDelete({ orderId });
        console.log('🗑️ Order deleted from MongoDB:', orderId);
        
        return NextResponse.json(
          { success: true, message: 'Order deleted' },
          { status: 200, headers: corsHeaders }
        );
      } catch (dbError) {
        console.error('⚠️ MongoDB error, using fallback:', dbError);
      }
    }
    
    // Fallback to in-memory
    ordersStore = ordersStore.filter((order: any) => order.orderId !== orderId);
    console.log('🗑️ Order deleted from memory:', orderId);
    
    return NextResponse.json(
      { success: true, message: 'Order deleted' },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('❌ Error deleting order:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// PATCH: Update order status
export async function PATCH(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();
    
    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: 'Order ID and status required' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Try MongoDB first
    if (connectDB && Order) {
      try {
        await connectDB();
        const order = await Order.findOneAndUpdate(
          { orderId },
          { status },
          { new: true }
        );
        console.log('✏️ Order status updated in MongoDB:', orderId, '→', status);
        
        return NextResponse.json(
          { success: true, data: order },
          { status: 200, headers: corsHeaders }
        );
      } catch (dbError) {
        console.error('⚠️ MongoDB error, using fallback:', dbError);
      }
    }
    
    // Fallback to in-memory
    ordersStore = ordersStore.map((order: any) => 
      order.orderId === orderId ? { ...order, status } : order
    );
    
    console.log('✏️ Order status updated in memory:', orderId, '→', status);
    
    const updatedOrder = ordersStore.find((order: any) => order.orderId === orderId);
    
    return NextResponse.json(
      { success: true, data: updatedOrder },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('❌ Error updating order:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}