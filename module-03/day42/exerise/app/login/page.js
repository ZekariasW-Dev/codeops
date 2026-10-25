import { getSafeNextPath } from "../../lib/safeNext.mjs";
import SignInForm from "./SignInForm";

export default async function LoginPage({ searchParams }) {
  const { next } = await searchParams;

  return (
    <main>
      <h2>Sign in</h2>
      <SignInForm next={getSafeNextPath(next)} />
    </main>
  );
}
