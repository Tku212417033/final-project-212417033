"use server";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth";

export async function updateProfile(name: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");
  await prisma.user.update({ where: { id: session.user.id }, data: { name } });
  return { success: true };
}