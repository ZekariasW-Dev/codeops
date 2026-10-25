import { cookies } from "next/headers";

const cookieName = "addis-eats-session";
const sessionLifetimeSeconds = 60 * 60 * 24 * 30;

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must contain at least 32 characters.");
  }
  return secret;
}

function encodeBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function decodeBase64Url(value) {
  if (!/^[A-Za-z0-9_-]+$/.test(value) || value.length % 4 === 1) {
    return null;
  }

  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function sign(value) {
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );
  return encodeBase64Url(new Uint8Array(signature));
}

export async function getSession(request) {
  const cookieValue = request
    ? request.cookies.get(cookieName)?.value
    : (await cookies()).get(cookieName)?.value;

  if (!cookieValue) {
    return null;
  }

  const separator = cookieValue.lastIndexOf(".");
  if (separator < 1) {
    return null;
  }

  const payload = cookieValue.slice(0, separator);
  const providedSignature = decodeBase64Url(cookieValue.slice(separator + 1));
  if (!providedSignature) {
    return null;
  }

  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const isValid = await globalThis.crypto.subtle.verify(
    "HMAC",
    key,
    providedSignature,
    new TextEncoder().encode(payload),
  );
  if (!isValid) {
    return null;
  }

  const payloadBytes = decodeBase64Url(payload);
  if (!payloadBytes) {
    return null;
  }

  let session;
  try {
    session = JSON.parse(new TextDecoder().decode(payloadBytes));
  } catch (error) {
    if (error instanceof SyntaxError) {
      return null;
    }
    throw error;
  }

  if (
    !session ||
    typeof session.id !== "string" ||
    typeof session.email !== "string" ||
    !["customer", "staff"].includes(session.role) ||
    typeof session.expiresAt !== "number" ||
    session.expiresAt <= Date.now()
  ) {
    return null;
  }

  return {
    id: session.id,
    email: session.email,
    role: session.role,
    expiresAt: session.expiresAt,
  };
}

export async function setSession(email, role) {
  const expiresAt = Date.now() + sessionLifetimeSeconds * 1000;
  const payload = encodeBase64Url(
    new TextEncoder().encode(
      JSON.stringify({
        id: globalThis.crypto.randomUUID(),
        email,
        role,
        expiresAt,
      }),
    ),
  );
  const cookieStore = await cookies();
  cookieStore.set(cookieName, `${payload}.${await sign(payload)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionLifetimeSeconds,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}
