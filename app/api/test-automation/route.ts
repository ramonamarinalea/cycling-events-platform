import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simple test to see if we can access the endpoint
    const results = {
      success: true,
      message: 'Test automation endpoint working',
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(results);
    
  } catch (error: any) {
    console.error('Test automation error:', error);
    return NextResponse.json(
      { error: 'Failed to run test', details: error.message },
      { status: 500 }
    );
  }
}