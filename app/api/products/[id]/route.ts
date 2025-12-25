import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { success: true, message: 'Product detail API - Not in use' },
    { status: 200 }
  );
}