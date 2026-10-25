import "server-only";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "addis-demo-session";
const sessionLifetimeSeconds = 8 * 60 * 60;

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set to at least 32 characters.");
  }
  return secret;
}

function sign(value) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export async function setDemoSession(name) {
  const payload = Buffer.from(JSON.stringify({
    userId: randomUUID(),
    sessionId: randomUUID(),
    name,
    role: "customer",
    expiresAt: Date.now() + sessionLifetimeSeconds * 1000,
  })).toString("base64url");
  const value = `${payload}.${sign(payload)}`;
  const cookieStore = await cookies();
  cookieStore.set(cookieName, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionLifetimeSeconds,
  });
}

export async function getDemoUser() {
  const cookieStore = await cookies();
  const value = cookieStore.get(cookieName)?.value;
  if (!value) return null;

  const separator = value.lastIndexOf(".");
  if (separator < 1) return null;
  const payload = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  if (!/^[A-Za-z0-9_-]+$/.test(signature)) return null;
  const providedSignature = Buffer.from(signature, "base64url");
  const expectedSignature = Buffer.from(sign(payload), "base64url");
  if (providedSignature.length !== expectedSignature.length || !timingSafeEqual(providedSignature, expectedSignature)) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (
      typeof session.userId !== "string" ||
      typeof session.sessionId !== "string" ||
      typeof session.name !== "string" ||
      session.role !== "customer" ||
      !Number.isFinite(session.expiresAt) ||
      session.expiresAt <= Date.now()
    ) return null;

    return {
      id: session.userId,
      sessionId: session.sessionId,
      name: session.name,
      role: session.role,
    };
  } catch {
    return null;
  }
}

export async function requireDemoUser() {
  const user = await getDemoUser();
  if (!user) redirect("/sign-in?next=%2Fcheckout");
  return user;
}

export function canPlaceOrder(user) {
  return user?.role === "customer";
}

export async function clearDemoSession() {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}