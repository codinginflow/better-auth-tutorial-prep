import { CurrentUser } from "@/components/current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerSession } from "@/lib/get-session";
import type { User } from "@/types";
import { format } from "date-fns";
import { CalendarDaysIcon, MailIcon, ShieldIcon, UserIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { unauthorized } from "next/navigation";
import { setTimeout } from "node:timers/promises";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();

  await setTimeout(800);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s your account overview.
          </p>
        </div>

        <EmailVerificationAlert user={user} />
        <ProfileInformation user={user} />
        <CurrentUser />
      </div>
    </div>
  );
}

interface EmailVerificationAlertProps {
  user: User;
}

function EmailVerificationAlert({ user }: EmailVerificationAlertProps) {
  if (user.emailVerified) return null;

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 dark:bg-yellow-950/30 dark:border-yellow-800/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MailIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <span className="text-yellow-800 dark:text-yellow-200">
            Please verify your email address to access all features.
          </span>
        </div>
        <Button size="sm" asChild>
          <Link href="/verify-email">Verify Email</Link>
        </Button>
      </div>
    </div>
  );
}

interface ProfileInformationProps {
  user: User;
}

function ProfileInformation({ user }: ProfileInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          Profile Information
        </CardTitle>
        <CardDescription>
          Your account details and current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-3 sm:items-start">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user.image || "/placeholder.svg"}
                alt={user.name}
              />
              <AvatarFallback className="text-lg">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {user.role && (
              <Badge className="border-0">
                <ShieldIcon className="h-3 w-3" />
                {user.role}
              </Badge>
            )}
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-semibold">{user.name}</h3>
              <p className="text-muted-foreground">{user.email}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDaysIcon className="h-4 w-4" />
                Member Since
              </div>
              <p className="font-medium">
                {format(user.createdAt, "MMMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
