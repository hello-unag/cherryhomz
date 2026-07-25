import { NextResponse } from 'next/server';
import { signJWT, COOKIE_NAME, cookieOptions } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (username === adminUsername && password === adminPassword) {
      const token = await signJWT({ username, role: 'admin' });
      
      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, token, cookieOptions);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
