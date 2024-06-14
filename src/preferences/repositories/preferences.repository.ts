import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePreferenceDto } from '../dto/create-preference.dto';
import { UpdatePreferenceDto } from '../dto/update-preference.dto';

@Injectable()
export class PreferencesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPreferenceDto: CreatePreferenceDto) {
    return this.prisma.preference.create({
      data: createPreferenceDto,
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.preference.findMany({
      where: { userId },
    });
  }

  async findOneByUser(id: string, userId: string) {
    return this.prisma.preference.findFirst({
      where: { id, userId },
    });
  }

  async update(
    id: string,
    userId: string,
    updatePreferenceDto: UpdatePreferenceDto,
  ) {
    const preference = await this.findOneByUser(id, userId);
    if (!preference) {
      throw new Error('Preference not found or does not belong to the user');
    }
    return this.prisma.preference.update({
      where: { id },
      data: updatePreferenceDto,
    });
  }

  async remove(id: string, userId: string) {
    const preference = await this.findOneByUser(id, userId);
    if (!preference) {
      throw new Error('Preference not found or does not belong to the user');
    }
    return this.prisma.preference.delete({
      where: { id },
    });
  }
}
