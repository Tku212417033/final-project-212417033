export async function updateCabin(id: string, data: { name?: string; description?: string; price?: number }, imageUrl?: string) {
  const cabin = await prisma.cabin.update({ where: { id }, data });
  if (imageUrl) {
    await prisma.cabinImage.upsert({
      where: { cabinId: id },
      create: { cabinId: id, url: imageUrl },
      update: { url: imageUrl },
    });
  }
  return cabin;
}