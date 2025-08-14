"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import * as React from "react";

interface ResendVerificationButtonProps {
  email: string;
}

export function ResendVerificationButton({
  email,
}: ResendVerificationButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function resendVerificationEmail() {
    if (!email) return;

    setError(null);
    setIsLoading(true);
    const { error: authError } = await authClient.sendVerificationEmail({
      email,
      callbackURL: "/email-verified",
    });
    setIsLoading(false);

    if (authError) {
      setError(authError.message || "Something went wrong");
    }
  }

  return (
    <div>
      {error && (
        <div role="alert" className="text-sm text-red-600 mb-4">
          {error}
        </div>
      )}
      <Button onClick={resendVerificationEmail} disabled={!email || isLoading}>
        {isLoading ? "Sending..." : "Resend verification email"}
      </Button>
    </div>
  );
}
