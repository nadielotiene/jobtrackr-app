import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!
    // !  ← tells TypeScript "trust me, this env var exists"
});

const prisma = new PrismaClient({ adapter });

export default prisma;
