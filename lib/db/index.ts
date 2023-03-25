import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient }

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    errorFormat: "minimal",
  });
} else {
  globalForPrisma["prisma"] =
    globalForPrisma["prisma"] ||
    new PrismaClient({
      errorFormat: "pretty",
    });
  prisma = globalForPrisma["prisma"];
}

export default prisma;
