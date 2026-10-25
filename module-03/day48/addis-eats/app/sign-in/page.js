import { signIn } from "../auth-actions";
import { getSafeNextPath } from "../data/redirects";
import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign in",
  description: "Sign in to view and manage your Addis Eats account and orders.",
  alternates: {
    canonical: "/sign-in",
  },
  robots: { index: false, follow: false },
};

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const nextPath = getSafeNextPath(params.next);

  return (
    <main>
      <h1>Sign in</h1>
      {params.error === "invalid" && (
        <p role="alert">Email or password was not recognized.</p>
      )}
      <SignInForm action={signIn} nextPath={nextPath} />
    </main>
  );
}


