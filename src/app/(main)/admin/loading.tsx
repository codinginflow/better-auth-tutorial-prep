import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 w-full">
      <Skeleton className="h-7 w-36" />
      <Skeleton className="mt-2 h-5 w-80" />
    </main>
  );
}
