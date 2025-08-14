import type { Metadata } from "next";
import { SignUpForm } from "./sign-up-form";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUp() {
  return (
    <div className="flex min-h-[70vh] items-start justify-center py-12">
      <SignUpForm />
    </div>
  );
}
