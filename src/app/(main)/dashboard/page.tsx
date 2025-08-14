import { CurrentUser } from "@/components/current-user";
import { getServerSession } from "@/lib/get-session";
import type { Metadata } from "next";
import Link from "next/dist/client/link";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2">Hello, {user.name}!</p>
      <p className="text-muted-foreground mt-2">
        If you can read this, you&apos;re authenticated.
      </p>
      {!user.emailVerified && (
        <div className="mt-2">
          <p className="text-red-500">
            <Link href="/verify-email" className="underline hover:no-underline">
              Please verify your email address
            </Link>
            .
          </p>
        </div>
      )}
      <CurrentUser />
    </main>
  );
}
