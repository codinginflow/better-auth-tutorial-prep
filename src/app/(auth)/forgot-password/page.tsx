import type { Metadata } from "next";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password",
};

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto grid min-h-screen max-w-5xl place-items-center px-4">
      <div className="text-center w-full">
        <h1 className="text-2xl font-semibold">Forgot password</h1>
        <p className="text-muted-foreground mt-2">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
        <div className="mt-6 w-full">
          <ForgotPasswordForm />
        </div>
      </div>
    </main>
  );
}
