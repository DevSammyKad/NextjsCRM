import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();
    const { firstName, lastName, age, grade, address, phoneNumber } = data;

    if (!firstName || !lastName || !age || !grade || !address || !phoneNumber) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const student = await prisma.student.create({
      data: {
        firstName,
        lastName,
        age: parseInt(age),
        grade,
        address,
        phoneNumber,
      },
    });

    return new NextResponse(JSON.stringify(student), { status: 200 });
  } catch (error) {
    console.error('Error during Add student:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(req) {
  try {
    const cacheStudents = await prisma.student.findMany();
    return NextResponse.json(cacheStudents, { status: 200 });
  } catch (error) {
    console.error('Error during Get All Students');
    return NextResponse('Internal Server error', { status: 500 });
  }
}
