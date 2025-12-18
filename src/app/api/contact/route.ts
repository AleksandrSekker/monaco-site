import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialize with environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  service?: string;
  phone?: string;
  currentPath?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Keep this for testing
      to: process.env.EMAIL_TO || 'sekkerpleksandr@gmail.com',
      subject: `New Contact: ${body.name} - ${body.service || 'General Inquiry'}`,
      text: `
        Name: ${body.name}
        Email: ${body.email}
        ${body.phone ? `Phone: ${body.phone}\n` : ''}
        ${body.service ? `Service: ${body.service}\n` : ''}
        ${body.currentPath ? `Page: ${body.currentPath}\n` : ''}
        Message: ${body.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        ${body.phone ? `<p><strong>Phone:</strong> ${body.phone}</p>` : ''}
        ${body.service ? `<p><strong>Service:</strong> ${body.service}</p>` : ''}
        ${body.currentPath ? `<p><strong>Page:</strong> ${body.currentPath}</p>` : ''}
        <h3>Message:</h3>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send message', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
