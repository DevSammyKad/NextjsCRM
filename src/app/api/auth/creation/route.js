// src/app/api/auth/creation/route.js

import { prisma } from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      console.error('User not found or missing ID');
      return new NextResponse('User not found', { status: 404 });
    }

    console.log('Retrieved user:', user);

    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    console.log('Database user:', dbUser);

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.given_name ?? '',
          lastName: user.family_name ?? '',
          email: user.email ?? '',
          profileImage: user.picture ?? ``,
          organizationId: organizationId, // Use the organizationId obtained from middleware
        },
      });

      console.log('Created new user:', dbUser);
    }

    return NextResponse.redirect('http://localhost:3000/dashboard');
  } catch (error) {
    console.error('Error during GET:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
