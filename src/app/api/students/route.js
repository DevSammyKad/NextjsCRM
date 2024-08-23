import prisma from "@/lib/db";
import { NextResponse } from "next/server";

async function getOrganizationIdFromRequest(req) {
  return "631f1013-e762-4ff5-82d7-1ad58cc8da6d";
}

async function getUserRole(req) {
  // Replace with your logic to get the user role from the session or JWT
  return "ADMIN"; // For demonstration purposes, we're using a hardcoded role
}

export async function POST(req) {
  try {
    const data = await req.json();
    const { firstName, lastName, age, grade, address, phoneNumber } = data;

    if (!firstName || !lastName || !age || !grade || !address || !phoneNumber) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const organizationId = await getOrganizationIdFromRequest(req);

    const student = await prisma.student.create({
      data: {
        firstName,
        lastName,
        age: parseInt(age),
        address,
        phoneNumber,
        gradeId: parseInt(grade),
        organizationId,
      },
    });

    return new NextResponse(JSON.stringify(student), { status: 200 });
  } catch (error) {
    console.error("Error during Add student:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req) {
  try {
    const organizationId = await getOrganizationIdFromRequest(req);

    const getALlStudents = await prisma.student.findMany({
      where: {
        organizationId,
      },
    });

    return new NextResponse(JSON.stringify(getALlStudents), { status: 200 });
  } catch (error) {
    console.error("Error during Get All Students:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
