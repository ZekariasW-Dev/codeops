import { signIn } from "../auth-actions";
import { getSafeNextPath } from "../data/redirects";

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
      <form action={signIn}>
        <input type="hidden" name="next" value={nextPath} />
        <label htmlFor="sign-in-email">Email</label>
        <input
          id="sign-in-email"
          name="email"
          type="email"
          autoComplete="username"
          required
        />
        <label htmlFor="sign-in-password">Password</label>
        <input
          id="sign-in-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
