import { NextResponse } from 'next/server';
import { COOKIE_NAME } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });

  return NextResponse.json({ success: true });
}
