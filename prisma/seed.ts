import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: "$2b$10$...hashed...", // 需使用 bcrypt 加密，範例為佔位符
      role: "admin",
      name: "Admin",
    },
  });
}

main()
  .then(() => console.log("Seeded successfully"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());