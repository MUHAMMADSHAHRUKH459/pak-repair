import { NextRequest, NextResponse } from 'next/server';

// In-memory storage (temporary solution)
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

// POST: Create new order
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    // Save to memory
    ordersStore.push(orderData);
    
    console.log('✅ Order saved:', orderData.orderId);
    
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
    console.log('📦 Fetching orders:', ordersStore.length);
    
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
    
    ordersStore = ordersStore.filter((order: any) => order.orderId !== orderId);
    
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
    const { orderId, status } = await request.json();
    
    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: 'Order ID and status required' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    ordersStore = ordersStore.map((order: any) => 
      order.orderId === orderId ? { ...order, status } : order
    );
    
    console.log('✏️ Order status updated:', orderId, '→', status);
    
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