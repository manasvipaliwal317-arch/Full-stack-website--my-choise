import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "zenvia_super_secret_jwt_key_2026_production"
);

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
}

export async function createSessionToken(user: UserSession): Promise<string> {
  return await new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

export async function verifySessionToken(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as UserSession;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("zenvia_session")?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch (error) {
    return null;
  }
}
