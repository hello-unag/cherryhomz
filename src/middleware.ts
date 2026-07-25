import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT, COOKIE_NAME } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes, except /admin/login and /api/auth
  if (
    pathname.startsWith('/admin') &&
    !pathname.startsWith('/admin/login') &&
    !pathname.startsWith('/api/auth')
  ) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const payload = await verifyJWT(token);

    if (!payload) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
