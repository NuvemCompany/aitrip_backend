import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto } from '../../domain/dto/create-location.dto';
import { UpdateLocationDto } from '../../domain/dto/update-location.dto';

@Injectable()
export class PrismaLocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateLocationDto) {
    return this.prisma.location.create({ data });
  }

  findAll() {
    return this.prisma.location.findMany();
  }

  findById(id: string) {
    return this.prisma.location.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateLocationDto) {
    return this.prisma.location.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.location.delete({ where: { id } });
  }
}
