import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Ad } from '@prisma/client';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Get()
  async findAll(): Promise<Ad[]> {
    return this.adsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ad> {
    return this.adsService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateAdDto): Promise<Ad> {
    return this.adsService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAdDto): Promise<Ad> {
    return this.adsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.adsService.remove(id);
  }
}
