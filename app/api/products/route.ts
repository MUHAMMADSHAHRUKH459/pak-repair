import { NextRequest, NextResponse } from 'next/server';

// Simple response - no database
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { success: true, message: 'Products API - Not in use' },
    { status: 200 }
  );
}