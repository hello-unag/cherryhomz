import { SignJWT, jwtVerify } from 'jose';

export const COOKIE_NAME = 'cherry-admin-token';

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 86400, // 24 hours
};

const getSecret = () => {
  const secret = process.env.JWT_SECRET || 'ch3rryh0mz_s3cur3_jwt_k3y_2025_pr0duct10n_r34dy_t0k3n_x9f2';
  return new TextEncoder().encode(secret);
};

export async function signJWT(payload: any) {
  try {
    const secret = getSecret();
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);
    return jwt;
  } catch (error) {
    console.error('Error signing JWT:', error);
    throw error;
  }
}

export async function verifyJWT(token: string) {
  try {
    const secret = getSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}
