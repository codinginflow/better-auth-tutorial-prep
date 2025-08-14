import type { Metadata } from "next";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign in",
};

// TODO: Add a redirect param and read the path from usePathname in unauthorized.tsx

export default function SignIn() {
  return (
    <div className="flex min-h-[70vh] items-start justify-center py-12">
      <SignInForm />
    </div>
  );
}
