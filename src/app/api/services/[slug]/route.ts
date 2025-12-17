import { NextResponse } from 'next/server';
import { getServiceBySlug } from '@/lib/sanity/utils';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const service = await getServiceBySlug(params.slug);

    if (!service) {
      return new NextResponse(JSON.stringify({ error: 'Service not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export const dynamic = 'force-dynamic';
