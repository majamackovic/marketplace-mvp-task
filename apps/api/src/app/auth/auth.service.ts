import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService) {}

  async me(
    userId: string,
  ): Promise<{ id: string; email: string; name?: string | null; phone?: string | null }> {
    const user = await this.prismaService.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, phone: true },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async register(
    data: RegisterDto,
  ): Promise<{ access_token: string; user: { id: string; email: string; name?: string | null; phone?: string | null } }> {
    const { email, password, name, phone } = data;

    const existingUser = await this.prismaService.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.prisma.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassword,
      },
    });

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
    };
  }

  async login(
    data: LoginDto,
  ): Promise<{ access_token: string; user: { id: string; email: string; name?: string | null; phone?: string | null } }> {
    const { email, password } = data;

    const user = await this.prismaService.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
    };
  }
}