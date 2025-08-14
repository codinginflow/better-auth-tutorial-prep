import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">403 – Forbidden</h1>
        <p className="text-muted-foreground">
          You don’t have access to this page.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/sign-in">Switch account</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
