"use server";

import { redirect } from "next/navigation";
import { authenticateUser } from "../data/auth";
import { setSessionCookie } from "../data/session";
import { getSafeNextPath } from "../../lib/safeNext.mjs";

export async function signIn(_previousState, formData) {
  const user = authenticateUser(formData.get("email"), formData.get("password"));
  if (!user) {
    return { message: "Email or password is incorrect." };
  }

  await setSessionCookie(user.userId, user.role);
  redirect(getSafeNextPath(formData.get("next")));
}
