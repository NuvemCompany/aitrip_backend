import { Injectable } from '@nestjs/common';
import { PrismaLocationRepository } from '../../infrastructure/database/prisma-location.repository';
import { CreateLocationDto } from '../../domain/dto/create-location.dto';
import { UpdateLocationDto } from '../../domain/dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: PrismaLocationRepository) {}

  createLocation(data: CreateLocationDto) {
    return this.locationRepository.create(data);
  }

  findAllLocations() {
    return this.locationRepository.findAll();
  }

  findLocationById(id: string) {
    return this.locationRepository.findById(id);
  }

  updateLocation(id: string, data: UpdateLocationDto) {
    return this.locationRepository.update(id, data);
  }

  deleteLocation(id: string) {
    return this.locationRepository.delete(id);
  }
}
