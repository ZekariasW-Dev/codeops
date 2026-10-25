import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";

export async function getSessionId() {
  const cookieStore = await cookies();
  return cookieStore.get("order-session")?.value;
}

export async function getOrCreateSessionId() {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get("order-session")?.value;

  if (!sessionId) {
    sessionId = randomUUID();
    cookieStore.set("order-session", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return sessionId;
}
