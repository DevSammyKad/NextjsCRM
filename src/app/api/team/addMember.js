import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name, email, role, team_id } = body;

  if (!name || !email || !team_id) {
    return NextResponse.json(
      { error: "Name, email, and team ID are required" },
      { status: 400 },
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
    console.error("Error adding team member:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
