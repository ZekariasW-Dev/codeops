"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";

function SignInSubmit() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending}>{pending ? "Signing in..." : "Sign in"}</button>;
}

export default function SignInForm({ action, nextPath }) {
  const submitted = useRef(false);
  function handleSubmit(event) {
    if (submitted.current) event.preventDefault();
    submitted.current = true;
  }
  return (
    <form action={action} onSubmit={handleSubmit}>
      <input type="hidden" name="next" value={nextPath} />
      <label htmlFor="sign-in-email">Email</label>
      <input id="sign-in-email" name="email" type="email" autoComplete="username" required />
      <label htmlFor="sign-in-password">Password</label>
      <input id="sign-in-password" name="password" type="password" autoComplete="current-password" required />
      <SignInSubmit />
    </form>
  );
}