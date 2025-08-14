import { auth } from "@/auth";
import { headers } from "next/headers";
import { cache } from "react";

// Deduplicate session requests on the server and simplify code
export const getServerSession = cache(async () => {
  const headersList = await headers();
  return await auth.api.getSession({ headers: headersList });
});
