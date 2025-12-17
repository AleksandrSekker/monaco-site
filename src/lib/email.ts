// src/lib/email.ts
import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  try {
    // In development, use Ethereal for testing
    const isDev = process.env.NODE_ENV === 'development';
    const testAccount = isDev ? await nodemailer.createTestAccount() : null;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST || (isDev ? 'smtp.ethereal.email' : ''),
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
      secure: process.env.EMAIL_SERVER_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVER_USER || testAccount?.user || '',
        pass: process.env.EMAIL_SERVER_PASSWORD || testAccount?.pass || '',
      },
    });

    const from = `"${process.env.EMAIL_FROM_NAME || 'Monaco Financial Solutions'}" <${process.env.EMAIL_FROM_ADDRESS || 'noreply@monacofs.com'}>`;

    console.log('Sending email with config:', {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      secure: process.env.EMAIL_SERVER_SECURE,
      from,
      to,
    });

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    console.log('Message sent: %s', info.messageId);

    if (isDev) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
