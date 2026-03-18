import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(
    @Req()
    req: { user?: { userId: string } },
  ): Promise<{ id: string; email: string; name?: string | null; phone?: string | null }> {
    return this.authService.me(req.user!.userId);
  }

  @Post('register')
  register(
    @Body() data: RegisterDto,
  ): Promise<{ access_token: string; user: { id: string; email: string; name?: string | null; phone?: string | null } }> {
    return this.authService.register(data);
  }

  @Post('login')
  login(
    @Body() data: LoginDto,
  ): Promise<{ access_token: string; user: { id: string; email: string; name?: string | null; phone?: string | null } }> {
    return this.authService.login(data);
  }
}

