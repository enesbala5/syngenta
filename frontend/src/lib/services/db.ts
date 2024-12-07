import Prisma from '@prisma/client';

export type DatabaseClient = Prisma.PrismaClient;

export let db: DatabaseClient;

if (Prisma === undefined) {
	import('@prisma/client').then(({ PrismaClient }) => {
		const db = new PrismaClient();
	});
} else {
	db = new Prisma.PrismaClient();
}
