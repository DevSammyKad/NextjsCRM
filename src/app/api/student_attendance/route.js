import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const month = parseInt(searchParams.get('month'), 10);
    const year = parseInt(searchParams.get('year'), 10);
    const grade = searchParams.get('grade');

    if (isNaN(month) || isNaN(year) || !grade) {
      return new NextResponse('Invalid query parameters', { status: 400 });
    }

    // Fetch all students in the specified grade
    const students = await prisma.student.findMany({
      where: {
        grade,
      },
      include: {
        // Include student_attendance records for the specified month and year
        student_attendance: {
          where: {
            month,
            year,
          },
        },
      },
    });

    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error('Internal Server error:', error);
    return new NextResponse('Internal Server error', { status: 500 });
  }
}

// pages/api/student_attendance.js

export async function POST(req) {
  try {
    const body = await req.json();
    const { studentId, present, day, month, year } = body;

    if (
      !studentId ||
      isNaN(day) ||
      isNaN(month) ||
      isNaN(year) ||
      typeof present !== 'boolean'
    ) {
      console.error('Invalid request body:', body);
      return new NextResponse('Invalid request body', { status: 400 });
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      console.error('Student not found:', studentId);
      return new NextResponse('Student not found', { status: 404 });
    }

    const attendanceRecord = await prisma.student_attendance.upsert({
      where: {
        studentId_day_month_year: {
          studentId,
          day,
          month,
          year,
        },
      },
      update: {
        present,
        updatedAt: new Date(), // Ensure the updatedAt field is updated
      },
      create: {
        studentId,
        present,
        day,
        month,
        year,
        createdAt: new Date(), // Set the createdAt field
        updatedAt: new Date(), // Set the updatedAt field
      },
    });

    console.log('Attendance record:', attendanceRecord);
    return NextResponse.json(attendanceRecord, { status: 200 });
  } catch (error) {
    console.error('Internal Server error:', error);
    console.error('Error details:', error);
    return new NextResponse('Internal Server error', { status: 500 });
  }
}
