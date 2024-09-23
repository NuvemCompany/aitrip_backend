import { Module } from '@nestjs/common';
import { UsersController } from './presentation/controller/users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersService } from './application/service/users.service';
import { UsersRepository } from './infrastructure/database/prisma-user.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
