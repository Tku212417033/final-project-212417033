"use server";
import { prisma } from "@/db/prisma";

export async function getAllProducts({ page = 1 }) {
  const data = await prisma.product.findMany({
    skip: (page - 1) * 10,
    take: 10,
    include: { image: true },
  });
  const total = await prisma.product.count();
  return { data, totalPages: Math.ceil(total / 10) };
}