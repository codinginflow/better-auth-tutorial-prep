import { CurrentUser } from "@/components/current-user";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { format } from "date-fns";
import { CalendarDaysIcon, MailIcon, ShieldIcon, UserIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/dist/client/link";
import { unauthorized } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) unauthorized();

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

        {/* Email Verification Alert */}
        {!user.emailVerified && (
          <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950 items-center">
            <MailIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="flex items-center justify-between">
              <span className="text-amber-800 dark:text-amber-200">
                Please verify your email address to access all features.
              </span>
              <Button
                variant="outline"
                size="sm"
                className="ml-4 border-amber-300 text-amber-800 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-200 dark:hover:bg-amber-900 bg-transparent"
                asChild
              >
                <Link href="/verify-email">Verify Email</Link>
              </Button>
            </AlertDescription>
          </Alert>
        )}

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
                  <Badge variant="secondary" className="border-0">
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
        <CurrentUser />
      </div>
    </div>
  );
}
