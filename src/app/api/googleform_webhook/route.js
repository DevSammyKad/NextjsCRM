import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Log Prisma client instance
    console.log('Prisma Client:', prisma);

    // Parse incoming JSON data
    const data = await req.json();
    console.log('Incoming data:', data); // Log incoming data

    const { age, email } = data;
    const parsedAge = parseInt(age, 10); // Ensure age is converted to an integer

    // Log model existence
    console.log('Checking google_form model:', prisma.google_form);

    // Create a new record in the google_form table with the received data
    const newRecord = await prisma.google_form.create({
      data: {
        age: parsedAge,
        email,
        data: JSON.stringify(data), // Optionally store the full data object
      },
    });

    // Respond with a success message
    return NextResponse.json(
      { message: 'Data received and stored successfully', newRecord },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}
