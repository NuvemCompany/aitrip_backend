import { Module } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { TravelsController } from './travels.controller';
import { TravelsRepository } from './repositories/travels.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/repositories/users.repository';

import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [TravelsController],
  providers: [
    TravelsService,
    TravelsRepository,
    PrismaService,
    UsersService,
    UsersRepository,
  ],
})
export class TravelsModule {}
