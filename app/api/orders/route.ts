import { NextRequest, NextResponse } from 'next/server';

// Fast timeout for MongoDB
const DB_TIMEOUT = 3000; // 3 seconds max

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Fast MongoDB with timeout
async function getMongooseWithTimeout() {
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('DB timeout')), DB_TIMEOUT)
  );
  
  const mongoPromise = (async () => {
    const connectDB = (await import('@/lib/mongodb')).default;
    const Order = (await import('@/models/Order')).default;
    await connectDB();
    return { Order };
  })();
  
  try {
    return await Promise.race([mongoPromise, timeoutPromise]) as { Order: any };
  } catch (error) {
    console.log('⚠️ MongoDB timeout, using fallback');
    return null;
  }
}

// In-memory fallback
let ordersStore: any[] = [];

// POST: Create order (with fast timeout)
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    // Try MongoDB with timeout
    const mongo = await getMongooseWithTimeout();
    if (mongo) {
      try {
        const order = await mongo.Order.create(orderData);
        console.log('✅ MongoDB saved:', orderData.orderId);
        return NextResponse.json(
          { success: true, data: order },
          { status: 201, headers: corsHeaders }
        );
      } catch (err) {
        console.error('MongoDB error:', err);
      }
    }
    
    // Fallback to memory
    ordersStore.push(orderData);
    console.log('✅ Memory saved:', orderData.orderId);
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

// GET: Fetch orders (with fast timeout)
export async function GET() {
  try {
    const mongo = await getMongooseWithTimeout();
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
    
    const mongo = await getMongooseWithTimeout();
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
    
    const mongo = await getMongooseWithTimeout();
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