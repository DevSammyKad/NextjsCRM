import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

// Function to get the organization ID from the request
async function getOrganizationIdFromRequest(req) {
  // This is just a placeholder. Replace it with your logic to get the organization ID.
  return '631f1013-e762-4ff5-82d7-1ad58cc8da6d';
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { studentId, present, day, month, year } = body;

    // Validate request body
    if (
      !studentId ||
      typeof day !== 'number' ||
      typeof month !== 'number' ||
      typeof year !== 'number' ||
      typeof present !== 'boolean'
    ) {
      console.error('Invalid request body:', body);
      return new NextResponse('Invalid request body', { status: 400 });
    }

    // Get organization ID from Req
    const organizationId = await getOrganizationIdFromRequest(req);

    // Verify student exists within the specified organization
    const student = await prisma.student.findFirst({
      where: {
        id: studentId,
        organizationId,
      },
    });

    if (!student) {
      console.error('Student not found in organization:', studentId);
      return new NextResponse('Student not found in organization', {
        status: 404,
      });
    }

    // Upsert attendance record
    const attendanceRecord = await prisma.studentAttendance.upsert({
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
    console.error('Internal Server error:', error.message);
    console.error('Error stack:', error.stack);
    return new NextResponse('Internal Server error', { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const month = parseInt(searchParams.get('month'), 10);
    const year = parseInt(searchParams.get('year'), 10);
    const grade = searchParams.get('grade');
    const studentId = searchParams.get('studentId');

    const organizationId = await getOrganizationIdFromRequest(req);

    if (studentId) {
      if (!studentId) {
        console.log('Student ID is not valid');
        return new NextResponse('Invalid query parameters', { status: 400 });
      }
      const attendanceCount = await prisma.studentAttendance.count({
        where: {
          studentId,
          month,
          year,
          student: {
            organizationId,
          },
        },
      });
      return NextResponse.json(
        { studentId, month, year, attendanceCount },
        { status: 200 }
      );
    }

    // Fetch all students in the specified grade
    else {
      if (isNaN(month) || isNaN(year) || !grade) {
        return new NextResponse('Invalid query parameters', { status: 400 });
      }
      const students = await prisma.student.findMany({
        where: {
          grade: { grade: grade },
          organizationId,
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
    }
  } catch (error) {
    console.error('Internal Server error:', error);
    return new NextResponse('Internal Server error', { status: 500 });
  }
}
