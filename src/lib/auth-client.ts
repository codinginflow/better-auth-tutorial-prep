"use client";

import { auth } from "@/auth";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    // We don't need this here, but if you call auth functions from the server, this sets the cookies automatically
    nextCookies(), // make sure this is the last plugin in the array
  ],
});
