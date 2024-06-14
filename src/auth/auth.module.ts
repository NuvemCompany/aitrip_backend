import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRepository } from './repositories/auth.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: env.JTW_SECRET,
    }),
  ],
  providers: [
    UsersService,
    UsersRepository,
    AuthService,
    PrismaService,
    AuthRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
