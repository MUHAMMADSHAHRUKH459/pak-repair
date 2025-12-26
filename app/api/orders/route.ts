import { NextRequest, NextResponse } from 'next/server';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Lazy load MongoDB (prevents build errors)
async function getMongoose() {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const Order = (await import('@/models/Order')).default;
    await connectDB();
    return { Order };
  } catch (error) {
    console.error('MongoDB not available:', error);
    return null;
  }
}

// In-memory fallback
let ordersStore: any[] = [];

// POST: Create order
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    // Try MongoDB
    const mongo = await getMongoose();
    if (mongo) {
      try {
        const order = await mongo.Order.create(orderData);
        console.log('✅ MongoDB:', orderData.orderId);
        return NextResponse.json(
          { success: true, data: order },
          { status: 201, headers: corsHeaders }
        );
      } catch (err) {
        console.error('MongoDB error:', err);
      }
    }
    
    // Fallback
    ordersStore.push(orderData);
    console.log('✅ Memory:', orderData.orderId);
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

// GET: Fetch orders
export async function GET() {
  try {
    // Try MongoDB
    const mongo = await getMongoose();
    if (mongo) {
      try {
        const orders = await mongo.Order.find().sort({ createdAt: -1 });
        console.log('📦 MongoDB:', orders.length);
        return NextResponse.json(
          { success: true, data: orders },
          { status: 200, headers: corsHeaders }
        );
      } catch (err) {
        console.error('MongoDB error:', err);
      }
    }
    
    // Fallback
    console.log('📦 Memory:', ordersStore.length);
    return NextResponse.json(
      { success: true, data: ordersStore },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
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
    
    // Try MongoDB
    const mongo = await getMongoose();
    if (mongo) {
      try {
        await mongo.Order.findOneAndDelete({ orderId });
        console.log('🗑️ MongoDB:', orderId);
        return NextResponse.json(
          { success: true },
          { status: 200, headers: corsHeaders }
        );
      } catch (err) {
        console.error('MongoDB error:', err);
      }
    }
    
    // Fallback
    ordersStore = ordersStore.filter((o: any) => o.orderId !== orderId);
    console.log('🗑️ Memory:', orderId);
    return NextResponse.json(
      { success: true },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
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
    
    // Try MongoDB
    const mongo = await getMongoose();
    if (mongo) {
      try {
        const order = await mongo.Order.findOneAndUpdate(
          { orderId },
          { status },
          { new: true }
        );
        console.log('✏️ MongoDB:', orderId, status);
        return NextResponse.json(
          { success: true, data: order },
          { status: 200, headers: corsHeaders }
        );
      } catch (err) {
        console.error('MongoDB error:', err);
      }
    }
    
    // Fallback
    ordersStore = ordersStore.map((o: any) => 
      o.orderId === orderId ? { ...o, status } : o
    );
    const order = ordersStore.find((o: any) => o.orderId === orderId);
    console.log('✏️ Memory:', orderId, status);
    return NextResponse.json(
      { success: true, data: order },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}