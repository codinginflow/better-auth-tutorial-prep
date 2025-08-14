import type { Metadata } from "next";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset password",
};

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token: string;
  }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams;

  return (
    <main className="mx-auto grid min-h-screen max-w-5xl place-items-center px-4">
      {token ? (
        <ResetPasswordUI token={token} />
      ) : (
        <div role="alert" className="text-sm text-red-600">
          Token is missing.
        </div>
      )}
    </main>
  );
}

interface ResetPasswordUIProps {
  token: string;
}

function ResetPasswordUI({ token }: ResetPasswordUIProps) {
  return (
    <div className="text-center w-full">
      <h1 className="text-2xl font-semibold">Reset password</h1>
      <p className="text-muted-foreground mt-2">
        Enter your new password below.
      </p>
      <div className="mt-6 w-full">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
