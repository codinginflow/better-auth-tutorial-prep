import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();

  if (session) redirect("/dashboard");

  return children;
}
