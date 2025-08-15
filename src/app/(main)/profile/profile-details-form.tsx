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
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X as XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const profileSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  image: z.string().optional().nullable(),
});

export type ProfileValues = z.infer<typeof profileSchema>;

interface ProfileDetailsFormProps {
  user: User;
}

export function ProfileDetailsForm({ user }: ProfileDetailsFormProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name ?? "",
      image: user.image ?? null,
    },
  });

  async function onSubmit(values: ProfileValues) {
    setStatus(null);
    setError(null);
    const { error } = await authClient.updateUser({
      name: values.name,
      image: values.image,
    });
    if (error) {
      setError(error.message ?? "Failed to update profile");
    } else {
      setStatus("Profile updated");
      router.refresh();
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        form.setValue("image", base64, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  }

  const imagePreview = form.watch("image");

  const loading = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Full name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {imagePreview && (
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16">
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                    unoptimized
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                    onClick={() =>
                      form.setValue("image", null, { shouldDirty: true })
                    }
                    aria-label="Remove image"
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">Preview</span>
              </div>
            )}

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
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
