'use client';

import dynamic from 'next/dynamic';

const ContactFormClient = dynamic(() => import('./ContactForm.client'), {
  ssr: false,
  loading: () => <div className="mt-4 h-[300px] w-full animate-pulse rounded-md bg-slate-100" />,
});

export default function ContactForm() {
  return <ContactFormClient />;
}
