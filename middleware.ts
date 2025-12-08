// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './src/lib/i18n';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public files and API routes
  if (PUBLIC_FILE.test(pathname) || pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return;
  }

  // Check if the pathname is missing a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) return;

  // Redirect to default locale
  const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|images|assets).*)'],
};
