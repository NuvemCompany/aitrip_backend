import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { UpdateActivityDto } from '../dto/update-activity.dto';

@Injectable()
export class ActivitiesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createActivityDto: CreateActivityDto) {
    return this.prisma.activity.create({
      data: createActivityDto,
    });
  }

  async findAllByTravel(travelId: string, userId: string) {
    const travel = await this.prisma.travel.findFirst({
      where: { id: travelId, userId },
    });
    if (!travel) {
      throw new Error('Travel not found or does not belong to the user');
    }
    return this.prisma.activity.findMany({
      where: { travelId },
    });
  }

  async findOneByTravel(id: string, travelId: string, userId: string) {
    const travel = await this.prisma.travel.findFirst({
      where: { id: travelId, userId },
    });
    if (!travel) {
      throw new Error('Travel not found or does not belong to the user');
    }
    return this.prisma.activity.findFirst({
      where: { id, travelId },
    });
  }

  async update(
    id: string,
    travelId: string,
    userId: string,
    updateActivityDto: UpdateActivityDto,
  ) {
    const activity = await this.findOneByTravel(id, travelId, userId);
    if (!activity) {
      throw new Error('Activity not found or does not belong to the travel');
    }
    return this.prisma.activity.update({
      where: { id },
      data: updateActivityDto,
    });
  }

  async remove(id: string, travelId: string, userId: string) {
    const activity = await this.findOneByTravel(id, travelId, userId);
    if (!activity) {
      throw new Error('Activity not found or does not belong to the travel');
    }
    return this.prisma.activity.delete({
      where: { id },
    });
  }
}
