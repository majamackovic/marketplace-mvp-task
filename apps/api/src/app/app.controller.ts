import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProjectDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('hello')
  getHello() {
    return { message: 'Hello from NestJS' };
  }

  @Get('projects')
  getAllProjects() {
    return this.appService.getAllProjects();
  }

  @Post('projects')
  createProject(@Body() body: CreateProjectDto) {
    return this.appService.createProject({
      title: body.title,
      description: body.description,
    });
  }
}
