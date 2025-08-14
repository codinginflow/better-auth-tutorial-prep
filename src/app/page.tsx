import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold">
        Better-Auth Tutorial
      </h1>
      <p className="mt-3 text-base sm:text-lg text-muted-foreground">
        Learn how to handle authentication in Next.js with Better-Auth with this
        tutorial by Coding in Flow
      </p>
      <Button asChild className="mt-6">
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </main>
  );
}
