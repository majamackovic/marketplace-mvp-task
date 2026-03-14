import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

