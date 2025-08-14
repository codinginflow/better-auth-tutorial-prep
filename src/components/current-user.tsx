"use client";

import { authClient } from "@/lib/auth-client";

export function CurrentUser() {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) {
    return (
      <p className="mt-2 text-sm text-muted-foreground">Loading session...</p>
    );
  }

  if (error) {
    return (
      <div className="mt-2 text-sm text-red-600">Error: {error.message}</div>
    );
  }

  const user = session?.user;

  if (!user) {
    return <p className="mt-2 text-sm text-muted-foreground">Not signed in.</p>;
  }

  return (
    <div className="mt-6 space-y-1">
      <p className="text-base">Signed in as {user.name ?? "User"}</p>
      <p className="text-sm text-muted-foreground">{user.email}</p>
    </div>
  );
}
