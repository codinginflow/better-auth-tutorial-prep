import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Email Verified",
};

export default function EmailVerifiedPage() {
  return (
    <main className="mx-auto grid flex-1 max-w-5xl place-items-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Email verified</h1>
        <p className="text-muted-foreground mt-2">
          Your email has been verified successfully.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/dashboard">Go to dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
