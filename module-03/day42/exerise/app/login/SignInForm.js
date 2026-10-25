"use client";

import { useActionState } from "react";
import { signIn } from "../auth/actions";

const initialState = { message: "" };

export default function SignInForm({ next }) {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="next" value={next} />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" autoComplete="username" required />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
      />

      <button type="submit" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </button>
      {state.message && <p role="alert">{state.message}</p>}
    </form>
  );
}
