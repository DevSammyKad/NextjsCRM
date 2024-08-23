// Import necessary modules
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

// Function to get the organization ID from the request
async function getOrganizationIdFromRequest(req) {
  // This is just a placeholder. Replace it with your logic to get the organization ID.
  return "631f1013-e762-4ff5-82d7-1ad58cc8da6d";
}

// Handler for GET request
export async function GET(req) {
  try {
    const organizationId = await getOrganizationIdFromRequest(req);

    if (!organizationId) {
      return new NextResponse("organizationId is required", { status: 400 });
    }

    // Fetch all grades for the organization
    const grades = await prisma.grade.findMany({
      where: {
        organizationId: organizationId,
      },
      include: {
        students: true,
      },
    });

    // Return the grades as a JSON response
    return NextResponse.json(grades);
  } catch (error) {
    console.error("Error fetching grades:", error);
    return NextResponse.json(
      { error: "Failed to fetch grades" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get("organizationId");

    if (!organizationId) {
      return new NextResponse("organizationId is required", { status: 400 });
    }

    const body = await request.json();
    const { grade } = body;

    if (!grade) {
      return new NextResponse("grade is required", { status: 400 });
    }

    const newGrade = await prisma.grade.create({
      data: {
        grade,
        organizationId,
      },
    });

    return NextResponse.json(newGrade, { status: 201 });
  } catch (error) {
    console.error("Error creating grade:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
