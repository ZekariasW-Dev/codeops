import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "addis-demo-session";

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
  const payload = Buffer.from(JSON.stringify({ name, expires: Date.now() + 8 * 60 * 60 * 1000 })).toString("base64url");
  const value = `${payload}.${sign(payload)}`;
  const cookieStore = await cookies();
  cookieStore.set(cookieName, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 8 * 60 * 60,
  });
}

export async function getDemoUser() {
  const cookieStore = await cookies();
  const value = cookieStore.get(cookieName)?.value;
  if (!value) return null;

  const separator = value.lastIndexOf(".");
  if (separator < 1) return null;
  const payload = value.slice(0, separator);
  const providedSignature = Buffer.from(value.slice(separator + 1));
  const expectedSignature = Buffer.from(sign(payload));
  if (providedSignature.length !== expectedSignature.length || !timingSafeEqual(providedSignature, expectedSignature)) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof session.name !== "string" || session.expires < Date.now()) return null;
    return { name: session.name };
  } catch {
    return null;
  }
}