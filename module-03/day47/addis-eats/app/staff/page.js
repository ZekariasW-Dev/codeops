import { notFound } from "next/navigation";
import { getSession } from "../data/session";

export const metadata = {
  title: "Staff dashboard",
  description: "Manage Addis Eats orders and restaurant operations.",
  robots: { index: false, follow: false },
};

export default async function StaffPage() {
  const session = await getSession();
  if (!session || session.role !== "staff") {
    notFound();
  }

  return (
    <main>
      <h1>Staff dashboard</h1>
      <p>Signed in as {session.email}.</p>
    </main>
  );
}
