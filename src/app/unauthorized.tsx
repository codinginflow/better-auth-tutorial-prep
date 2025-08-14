"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UnauthorizedPage() {
  const pathname = usePathname();
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">401 – Unauthorized</h1>
        <p className="text-muted-foreground">Please sign in to continue.</p>
        <div>
          <Button asChild>
            <Link href={`/sign-in?redirect=${pathname ?? "/dashboard"}`}>
              Sign in
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
