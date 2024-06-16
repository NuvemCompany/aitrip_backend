import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { ActivitiesRepository } from './repositories/activities.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Module({
  imports: [AuthModule],
  controllers: [ActivitiesController],
  providers: [
    ActivitiesService,
    ActivitiesRepository,
    UsersService,
    UsersRepository,
    PrismaService,
  ],
})
export class ActivitiesModule {}
