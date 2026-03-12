import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { AdsModule } from './ads/ads.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PrismaModule, AdsModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
