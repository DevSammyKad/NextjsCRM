import { Resend } from 'resend';
import welcome from '@/emails/welcome';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const to = searchParams.get('to');

  if (!to) {
    return NextResponse.json(
      { success: false, message: 'Email parameter is missing' },
      { status: 400 }
    );
  }

  try {
    console.log('Sending email to:', to);
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject: 'Invitation To join Team',
      react: welcome(),
    });
    console.log('Email sent response:', response);
    return NextResponse.json({ success: true, status: 'ok' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      {
        success: false,
        status: 'error',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
