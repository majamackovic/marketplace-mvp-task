import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private client: PrismaClient | null = null;

  async onModuleInit() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    const adapter = new PrismaPg({ connectionString });
    this.client = new PrismaClient({ adapter });
    await this.client.$connect();
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.$disconnect();
      this.client = null;
    }
  }

  get prisma(): PrismaClient {
    if (!this.client) {
      throw new Error('PrismaClient is not initialized');
    }
    return this.client;
  }
}
