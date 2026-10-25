"use client";

import { useActionState } from "react";
import { signIn } from "../app/actions";

const initialState = { status: "idle", message: "" };

export default function SignInForm() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form className="delivery-form sign-in-panel" action={formAction}>
      <p className="eyebrow">Demo account</p>
      <h2>Continue with your name</h2>
      <p>This learning project creates a signed, eight-hour demo session. It does not verify a password or create a persistent account.</p>
      <label className="field" htmlFor="signin-name">Name
        <input id="signin-name" name="name" autoComplete="name" maxLength={80} required />
      </label>
      {state.message && <p className="form-error" role="alert">{state.message}</p>}
      <button className="button button-dark" type="submit" disabled={pending}>{pending ? "Continuing..." : "Continue to checkout"}</button>
    </form>
  );
}
