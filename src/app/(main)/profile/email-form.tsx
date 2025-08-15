"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const emailSchema = z.object({
  newEmail: z.email({ message: "Enter a valid email" }),
});

export type EmailValues = z.infer<typeof emailSchema>;

interface EmailFormProps {
  currentEmail: string;
}

export function EmailForm({ currentEmail }: EmailFormProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      newEmail: currentEmail,
    },
  });

  async function onSubmit(values: EmailValues) {
    setStatus(null);
    setError(null);
    // TODO: Why does this trigger the default verfication email instead of the "change" one?
    const { error } = await authClient.changeEmail({
      newEmail: values.newEmail,
      callbackURL: "/email-verified",
    });
    if (error) {
      setError(error.message ?? "Failed to initiate email change");
    } else {
      setStatus("Verification email sent to your current address");
    }
  }

  const loading = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Email</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="new@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div role="alert" className="text-sm text-red-600">
                {error}
              </div>
            )}
            {status && (
              <div role="status" className="text-sm text-green-600">
                {status}
              </div>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Request change"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
