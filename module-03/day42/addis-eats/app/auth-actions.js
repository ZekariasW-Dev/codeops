"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { redirect } from "next/navigation";
import { clearSession, setSession } from "./data/session";
import { getSafeNextPath } from "./data/redirects";

function getConfiguredCredentials() {
  const credentials = {
    customerEmail: process.env.AUTH_USER_EMAIL,
    customerPassword: process.env.AUTH_USER_PASSWORD,
    staffEmail: process.env.AUTH_STAFF_EMAIL,
    staffPassword: process.env.AUTH_STAFF_PASSWORD,
  };

  if (Object.values(credentials).some((value) => !value)) {
    throw new Error(
      "Set AUTH_USER_EMAIL, AUTH_USER_PASSWORD, AUTH_STAFF_EMAIL, and AUTH_STAFF_PASSWORD.",
    );
  }

  return credentials;
}

function passwordsMatch(provided, configured) {
  const providedDigest = createHash("sha256").update(provided).digest();
  const configuredDigest = createHash("sha256").update(configured).digest();
  return timingSafeEqual(providedDigest, configuredDigest);
}

export async function signIn(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const nextPath = getSafeNextPath(formData.get("next"));

  if (typeof email !== "string" || typeof password !== "string") {
    redirect(`/sign-in?error=invalid&next=${encodeURIComponent(nextPath)}`);
  }

  const credentials = getConfiguredCredentials();
  const normalizedEmail = email.trim().toLowerCase();
  let role;

  if (
    normalizedEmail === credentials.staffEmail.trim().toLowerCase() &&
    passwordsMatch(password, credentials.staffPassword)
  ) {
    role = "staff";
  } else if (
    normalizedEmail === credentials.customerEmail.trim().toLowerCase() &&
    passwordsMatch(password, credentials.customerPassword)
  ) {
    role = "customer";
  }

  if (!role) {
    redirect(`/sign-in?error=invalid&next=${encodeURIComponent(nextPath)}`);
  }

  await setSession(normalizedEmail, role);
  redirect(nextPath);
}

export async function signOut() {
  await clearSession();
  redirect("/sign-in");
}
