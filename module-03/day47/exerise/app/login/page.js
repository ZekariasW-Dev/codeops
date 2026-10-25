import { getSafeNextPath } from "../../lib/safeNext.mjs";
import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign in",
  description: "Sign in to manage your Addis Eats orders.",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }) {
  const { next } = await searchParams;

  return (
    <main>
      <h2>Sign in</h2>
      <SignInForm next={getSafeNextPath(next)} />
    </main>
  );
}
