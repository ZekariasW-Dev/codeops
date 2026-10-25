import { createHash, timingSafeEqual } from "node:crypto";

function passwordMatches(candidate, configured) {
  const candidateHash = createHash("sha256").update(candidate).digest();
  const configuredHash = createHash("sha256").update(configured).digest();
  return timingSafeEqual(candidateHash, configuredHash);
}

export function authenticateUser(email, password) {
  const customerEmail = process.env.CUSTOMER_EMAIL;
  const customerPassword = process.env.CUSTOMER_PASSWORD;
  const staffEmail = process.env.STAFF_EMAIL;
  const staffPassword = process.env.STAFF_PASSWORD;

  if (!customerEmail || !customerPassword) {
    throw new Error("Configure CUSTOMER_EMAIL and CUSTOMER_PASSWORD to enable sign-in.");
  }
  if (Boolean(staffEmail) !== Boolean(staffPassword)) {
    throw new Error("Configure both STAFF_EMAIL and STAFF_PASSWORD.");
  }

  if (typeof email !== "string" || typeof password !== "string") return null;

  const normalizedEmail = email.trim().toLowerCase();
  if (
    staffEmail &&
    normalizedEmail === staffEmail.trim().toLowerCase() &&
    passwordMatches(password, staffPassword)
  ) {
    return { userId: normalizedEmail, role: "staff" };
  }

  if (
    normalizedEmail === customerEmail.trim().toLowerCase() &&
    passwordMatches(password, customerPassword)
  ) {
    return { userId: normalizedEmail, role: "customer" };
  }

  return null;
}
