import { notFound } from "next/navigation";
import { getSession } from "../data/session";

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
