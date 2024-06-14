import { Injectable } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { TravelsRepository } from './repositories/travels.repository';

@Injectable()
export class TravelsService {
  constructor(private readonly travelsRepository: TravelsRepository) {}

  create(createTravelDto: CreateTravelDto) {
    return this.travelsRepository.create(createTravelDto);
  }

  findAllByUser(userId: string) {
    return this.travelsRepository.findAllByUser(userId);
  }

  findOneByUser(id: string, userId: string) {
    return this.travelsRepository.findOneByUser(id, userId);
  }

  update(id: string, userId: string, updateTravelDto: UpdateTravelDto) {
    return this.travelsRepository.update(id, userId, updateTravelDto);
  }

  remove(id: string, userId: string) {
    return this.travelsRepository.remove(id, userId);
  }
}
