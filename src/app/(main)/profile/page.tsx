import { EmailForm } from "@/app/(main)/profile/email-form";
import { PasswordForm } from "@/app/(main)/profile/password-form";
import { ProfileDetailsForm } from "@/app/(main)/profile/profile-details-form";
import { getServerSession } from "@/lib/get-session";
import type { Metadata } from "next";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();

  return (
    <main className="mx-auto max-w-lg px-4 py-12 w-full">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p className="text-muted-foreground mt-2">
        Update your account details, email, and password.
      </p>
      <div className="mt-6 space-y-8">
        <ProfileDetailsForm user={user} />
        <EmailForm currentEmail={user.email} />
        <PasswordForm />
      </div>
    </main>
  );
}
