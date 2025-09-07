import { PrismaClient } from '../generated/prisma';

declare global {
  var prismaClient: PrismaClient | undefined;
}

// Singleton instance
export const prismaClient =
  global.prismaClient ||
  new PrismaClient({ log: ['query', 'error', 'warn'] });

if (process.env.NODE_ENV !== 'production') global.prismaClient = prismaClient;

export { PrismaClient };
