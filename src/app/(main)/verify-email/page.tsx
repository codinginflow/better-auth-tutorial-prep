import { getServerSession } from "@/lib/get-session";
import type { Metadata } from "next";
import { redirect, unauthorized } from "next/navigation";
import { ResendVerificationButton } from "./resend-verification-button";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default async function VerifyEmailPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();

  if (user.emailVerified) redirect("/dashboard");

  return (
    <main className="mx-auto grid flex-1 max-w-5xl place-items-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Verify your email</h1>
        <p className="text-muted-foreground mt-2">
          A verification email was sent to your inbox.
        </p>
        <div className="mt-6">
          <ResendVerificationButton email={user.email} />
        </div>
      </div>
    </main>
  );
}
