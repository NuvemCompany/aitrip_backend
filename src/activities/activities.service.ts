import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivitiesRepository } from './repositories/activities.repository';

@Injectable()
export class ActivitiesService {
  constructor(private readonly activitiesRepository: ActivitiesRepository) {}

  create(createActivityDto: CreateActivityDto) {
    return this.activitiesRepository.create(createActivityDto);
  }

  findAllByTravel(travelId: string, userId: string) {
    return this.activitiesRepository.findAllByTravel(travelId, userId);
  }

  findOneByTravel(id: string, travelId: string, userId: string) {
    return this.activitiesRepository.findOneByTravel(id, travelId, userId);
  }

  update(
    id: string,
    travelId: string,
    userId: string,
    updateActivityDto: UpdateActivityDto,
  ) {
    return this.activitiesRepository.update(
      id,
      travelId,
      userId,
      updateActivityDto,
    );
  }

  remove(id: string, travelId: string, userId: string) {
    return this.activitiesRepository.remove(id, travelId, userId);
  }
}
