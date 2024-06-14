import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTravelDto } from '../dto/create-travel.dto';
import { UpdateTravelDto } from '../dto/update-travel.dto';

@Injectable()
export class TravelsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTravelDto: CreateTravelDto) {
    return this.prisma.travel.create({
      data: createTravelDto,
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.travel.findMany({
      where: { userId },
    });
  }

  async findOneByUser(id: string, userId: string) {
    return this.prisma.travel.findFirst({
      where: { id, userId },
    });
  }

  async update(id: string, userId: string, updateTravelDto: UpdateTravelDto) {
    const travel = await this.findOneByUser(id, userId);
    if (!travel) {
      throw new Error('Travel not found or does not belong to the user');
    }
    return this.prisma.travel.update({
      where: { id },
      data: updateTravelDto,
    });
  }

  async remove(id: string, userId: string) {
    const travel = await this.findOneByUser(id, userId);
    if (!travel) {
      throw new Error('Travel not found or does not belong to the user');
    }
    return this.prisma.travel.delete({
      where: { id },
    });
  }
}
