import prisma from '@/lib/db';
import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get('id');

  if (!teamId) {
    return NextResponse.json({ error: 'Team ID is required' }, { status: 400 });
  }

  try {
    const team = await prisma.teams.findUnique({
      where: { id: teamId },
      include: {
        team_members: true, // Include the team members
      },
    });

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    return NextResponse.json(team, { status: 200 });
  } catch (error) {
    console.error('Error fetching team:', error.message);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const body = await request.json();
  const { name, email, role, team_id } = body;

  if (!name || !email || !team_id) {
    return NextResponse.json(
      { error: 'Name, email, and team ID are required' },
      { status: 400 }
    );
  }

  try {
    const newMember = await prisma.team_members.create({
      data: {
        name,
        email,
        role,
        team_id,
      },
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error('Error adding team member:', error.message);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, type, value } = body;

    if (!id || !type || !value) {
      return NextResponse.json(
        { error: 'ID, type, and value are required' },
        { status: 400 }
      );
    }

    let updatedMember;

    if (type === 'role') {
      console.log(`Updating team member with ID: ${id} to role: ${value}`);
      updatedMember = await prisma.team_members.update({
        where: { id },
        data: { role: value },
      });
    } else if (type === 'status') {
      console.log(`Updating team member with ID: ${id} to status: ${value}`);
      updatedMember = await prisma.team_members.update({
        where: { id },
        data: { status: value },
      });
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json(updatedMember, { status: 200 });
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// export async function DELETE(request) {
//   const { searchParams } = new URL(request.url);
//   const memberId = searchParams.get('id');

//   if (!memberId) {
//     return NextResponse.json(
//       { error: 'Member ID is required' },
//       { status: 400 }
//     );
//   }

//   try {
//     const deletedMember = await prisma.team_members.delete({
//       where: { id: memberId },
//     });

//     if (!deletedMember) {
//       return NextResponse.json({ error: 'Member not found' }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: 'Member deleted successfully' },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error deleting team member:', error.message);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
