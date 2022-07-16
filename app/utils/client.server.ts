import { PrismaClient } from '@prisma/client';
let prisma: PrismaClient;

declare global {
    var __db: PrismaClient | undefined;
}

/**
 * This is needed because in development we don't want to restart the server with every change.
 * So we need to make sure that the db is only initialized once.
 * This here makes sure that we don't create a new connection to the DB with every change.
 */

if (process.env.NODE_ENV === "development") {
    prisma = new PrismaClient();
} else {
    if (!global.__db) {
        global.__db = new PrismaClient();
    }
    prisma = global.__db;
}

export { prisma };