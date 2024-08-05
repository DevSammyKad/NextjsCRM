import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

// Function to get the organization ID from the request
async function getOrganizationIdFromRequest(req) {
  // This is just a placeholder. Replace it with your logic to get the organization ID.
  return '631f1013-e762-4ff5-82d7-1ad58cc8da6d';
}

export async function GET(rq) {
  try {
    const { searchParams } = new URL(rq.url);
    const studentId = searchParams.get('studentId');

    if (!studentId) {
      return new NextResponse('Invalid query parameters', { status: 400 });
    }
    const organizationId = await getOrganizationIdFromRequest(req);
    console.log('organizationId:', organizationId);

    const attendanceRecord = await prisma.studentAttendance.findMany({
      where: {
        studentId,
        student: {
          organizationId,
        },
      },
    });
    return NextResponse.json(attendanceRecord, { status: 200 });
  } catch (error) {
    console.error('Internal Server error:', error.message);
    console.error('Error stack:', error.stack);
    return new NextResponse('Internal Server error', { status: 500 });
  }
}
