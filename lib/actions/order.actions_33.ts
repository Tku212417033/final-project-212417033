"use server";

import { prisma } from "@/db/prisma";

export async function getAllOrders({ page = 1 }) {
  const data = await prisma.order.findMany({
    skip: (page - 1) * 10,
    take: 10,
    include: { user: true, product: true },
  });
  const total = await prisma.order.count();
  return { data, totalPages: Math.ceil(total / 10) };
}

export async function createOrder(data: { userId: string; productId: string; quantity: number; total: number }) {
  await prisma.order.create({ data });
  return { success: true };
}

export async function updateOrder(id: string, data: { quantity?: number; total?: number }) {
  await prisma.order.update({ where: { id }, data });
  return { success: true };
}

export async function deleteOrder(id: string) {
  await prisma.order.delete({ where: { id } });
  return { success: true };
}