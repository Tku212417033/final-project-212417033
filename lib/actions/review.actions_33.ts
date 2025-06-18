"use server";

import { prisma } from "@/db/prisma";

export async function getAllReviews({ page = 1 }) {
  const data = await prisma.review.findMany({
    skip: (page - 1) * 10,
    take: 10,
    include: { product: true },
  });
  const total = await prisma.review.count();
  return { data, totalPages: Math.ceil(total / 10) };
}

export async function createReview(data: { productId: string; rating: number; comment: string }) {
  await prisma.review.create({ data });
  return { success: true };
}

export async function updateReview(id: string, data: { rating?: number; comment?: string }) {
  await prisma.review.update({ where: { id }, data });
  return { success: true };
}

export async function deleteReview(id: string) {
  await prisma.review.delete({ where: { id } });
  return { success: true };
}