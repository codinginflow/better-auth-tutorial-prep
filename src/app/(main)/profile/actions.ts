"use server";

import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { profileSchema, type ProfileValues } from "./schema";

export async function updateProfile(input: ProfileValues): Promise<void> {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { name, email } = profileSchema.parse(input);

  const emailChanged = email.toLowerCase() !== user.email.toLowerCase();

  await prisma.user.update({
    where: { id: user.id },
    data: {
      name,
      email,
      ...(emailChanged ? { emailVerified: false } : {}),
    },
  });

  revalidatePath("/profile");
}
