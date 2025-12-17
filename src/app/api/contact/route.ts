// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  service?: string;
  currentPath?: string;
  phone?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send email
    await sendEmail({
      to: process.env.EMAIL_TO || 'your-email@example.com',
      subject: `New Contact Form Submission: ${body.service || 'General Inquiry'}`,
      text: `
        Name: ${body.name}
        Email: ${body.email}
        Phone: ${body.phone || 'Not provided'}
        Service: ${body.service || 'General Inquiry'}
        Page: ${body.currentPath || 'Unknown'}
        
        Message:
        ${body.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${body.service || 'General Inquiry'}</p>
        <p><strong>Page:</strong> ${body.currentPath || 'Unknown'}</p>
        <h3>Message:</h3>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Error processing your request' }, { status: 500 });
  }
}
