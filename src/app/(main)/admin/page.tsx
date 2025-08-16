import { getServerSession } from "@/lib/get-session";
import type { Metadata } from "next";
import { forbidden, unauthorized } from "next/navigation";
import { setTimeout } from "node:timers/promises";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();

  if (user.role !== "admin") forbidden();

  await setTimeout(800);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 w-full">
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="text-muted-foreground mt-2">
        You have administrator access.
      </p>
    </main>
  );
}
