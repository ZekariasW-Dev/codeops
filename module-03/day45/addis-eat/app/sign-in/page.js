import { redirect } from "next/navigation";
import SignInForm from "../../components/SignInForm";
import { getDemoUser } from "../../lib/session";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sign in | Addis Eats",
  description: "Sign in to continue to Addis Eats checkout.",
};

export default async function SignInPage({ searchParams }) {
  const [user, query] = await Promise.all([getDemoUser(), searchParams]);
  const next = query.next === "/checkout" ? query.next : "/checkout";
  if (user) redirect(next);

  return (
    <section className="page-wrap">
      <header className="page-heading">
        <div><p className="eyebrow">Welcome back</p><h1>Sign in</h1></div>
      </header>
      <SignInForm />
    </section>
  );
}
