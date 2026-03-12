import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getAllProjects() {
    return this.prisma.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  createProject(data: { title: string; description?: string | null }) {
    return this.prisma.prisma.project.create({
      data: {
        title: data.title,
        description: data.description ?? null,
      },
    });
  }
}
