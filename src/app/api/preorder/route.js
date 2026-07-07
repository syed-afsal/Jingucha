import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate basic inputs
    if (!data.name || !data.email || !data.quantity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // In a real application, you would save this to a database.
    // For this demonstration of backend capabilities, we log it and simulate processing.
    console.log('--- NEW PREORDER RECEIVED ---');
    console.log(`Name: ${data.name}`);
    console.log(`Email: ${data.email}`);
    console.log(`Quantity: ${data.quantity}`);
    console.log('-----------------------------');

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({ success: true, message: 'Preorder received successfully' }, { status: 200 });
  } catch (error) {
    console.error('Preorder error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
