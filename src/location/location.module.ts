import { Module } from '@nestjs/common';
import { LocationService } from './application/service/location.service';
import { LocationController } from './presentation/controller/location.controller';
import { PrismaLocationRepository } from './infrastructure/database/prisma-location.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LocationService, PrismaLocationRepository],
  controllers: [LocationController],
})
export class LocationModule {}
