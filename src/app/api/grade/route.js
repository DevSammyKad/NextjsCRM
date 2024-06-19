import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const grade = await prisma.grade.findMany();
    return NextResponse.json(grade);
  } catch (error) {
    console.error('Error fetching grades:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { grade } = await request.json();
    const newGrade = await prisma.grade.create({
      data: { grade },
    });
    return NextResponse.json(newGrade, { status: 201 });
  } catch (error) {
    console.error('Error creating grade:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
