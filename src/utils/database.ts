import { PrismaClient } from "@prisma/client";

// Prevent multiple clients in dev
const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const db =
    globalForPrisma.prisma ?? new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV === "development") {
    globalForPrisma.prisma = db;
}
