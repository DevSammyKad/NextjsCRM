import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      organizationName,
      organizationPanCard,
      organizationMail,
      organizationType,
      organizationWebsite,
    } = data;

    const existingOrganization = await prisma.organization.findFirst({
      where: {
        OR: [{ organizationMail }, { organizationPanCard }],
      },
    });

    if (existingOrganization) {
      const conflictField =
        existingOrganization.organizationMail === organizationMail
          ? 'Email'
          : 'PAN Card';
      return new NextResponse(
        JSON.stringify({ error: `${conflictField} Already Exists` })
      );
    }

    const organization = await prisma.organization.create({
      data: {
        organizationName,
        organizationPanCard,
        organizationMail,
        organizationType,
        organizationWebsite,
      },
    });

    return new NextResponse(JSON.stringify(organization), { status: 200 });
  } catch (error) {
    console.error('Error during Create Organization:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET() {
  try {
    const organizations = await prisma.organization.findMany();
    return new NextResponse(JSON.stringify(organizations), { status: 200 });
  } catch (error) {
    console.error('Error during Get Organizations:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
// export async function GET(req, { params }) {
//   const { id } = params;
//   try {
//     const organization = await prisma.organization.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (!organization) {
//       return new NextResponse('Organization Not Found', { status: 404 });
//     }

//     return new NextResponse(JSON.stringify(organization), { status: 200 });
//   } catch (error) {
//     console.error('Error during get Organization:', error);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }
