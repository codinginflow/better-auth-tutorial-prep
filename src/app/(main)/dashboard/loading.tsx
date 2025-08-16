import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-5 w-80" />
        </div>

        <div className="rounded-lg border">
          <div className="border-b p-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-40" />
            </div>
            <Skeleton className="mt-2 h-4 w-64" />
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex flex-col items-center gap-3 sm:items-start">
                <Skeleton className="h-20 w-20 rounded-full" />
                <Skeleton className="h-5 w-16" />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <Skeleton className="h-7 w-48" />
                  <Skeleton className="mt-2 h-4 w-64" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <Skeleton className="h-5 w-40" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6 space-y-3">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-80" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    </div>
  );
}
