import { Injectable, NotFoundException } from '@nestjs/common';
import { Ad } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';

@Injectable()
export class AdsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Ad[]> {
    return this.prismaService.prisma.ad.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<Ad> {
    const ad = await this.prismaService.prisma.ad.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!ad) {
      throw new NotFoundException(`Ad with id "${id}" not found`);
    }

    return ad;
  }

  async create(data: CreateAdDto & { authorId: string }): Promise<Ad> {
    return this.prismaService.prisma.ad.create({
      data,
      include: { category: true },
    });
  }

  async update(id: string, data: UpdateAdDto): Promise<Ad> {
    await this.ensureExists(id);

    return this.prismaService.prisma.ad.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async remove(id: string): Promise<void> {
    await this.ensureExists(id);

    await this.prismaService.prisma.ad.delete({
      where: { id },
    });
  }

  private async ensureExists(id: string): Promise<void> {
    const count = await this.prismaService.prisma.ad.count({
      where: { id },
    });

    if (!count) {
      throw new NotFoundException(`Ad with id "${id}" not found`);
    }
  }
}
