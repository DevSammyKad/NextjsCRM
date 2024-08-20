import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

async function getOrganizationIdFromRequest(req) {
  return '631f1013-e762-4ff5-82d7-1ad58cc8da6d';
}

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  try {
    // const organizationId = await getOrganizationIdFromRequest(req);
    // await setCurrentOrganization(organizationId);

    const leads = await prisma.lead.findMany();
    return new NextResponse(JSON.stringify(leads), { status: 200 });
  } catch (error) {
    console.error('something wrong on GET all Leads', error);
    return new NextResponse('server error', { status: 500 });
  }
}
export async function POST(req) {}
