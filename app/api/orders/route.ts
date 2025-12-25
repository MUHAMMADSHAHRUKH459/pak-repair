import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

// POST: Create new order
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const orderData = await request.json();
    
    // Save to MongoDB
    const order = await Order.create(orderData);
    
    console.log('✅ Order saved to MongoDB:', orderData.orderId);
    
    return NextResponse.json(
      { success: true, data: order },
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
    await connectDB();
    
    // Fetch from MongoDB (sorted by newest first)
    const orders = await Order.find().sort({ createdAt: -1 });
    
    console.log('📦 Fetched orders from MongoDB:', orders.length);
    
    return NextResponse.json(
      { success: true, data: orders },
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
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    
    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID required' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    await Order.findOneAndDelete({ orderId });
    
    console.log('🗑️ Order deleted:', orderId);
    
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
    await connectDB();
    
    const { orderId, status } = await request.json();
    
    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: 'Order ID and status required' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    const order = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );
    
    console.log('✏️ Order status updated:', orderId, '→', status);
    
    return NextResponse.json(
      { success: true, data: order },
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