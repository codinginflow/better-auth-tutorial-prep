import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 w-full">
      <Skeleton className="h-7 w-36" />
      <Skeleton className="mt-2 h-5 w-80" />

      <div className="mt-6 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="rounded-lg border">
            <div className="p-6 border-b">
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div className="rounded-lg border">
            <div className="p-6 border-b">
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-40" />
            </div>
          </div>

          <div className="rounded-lg border">
            <div className="p-6 border-b">
              <Skeleton className="h-5 w-36" />
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-44" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
