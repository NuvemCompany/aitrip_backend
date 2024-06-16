import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { ActivitiesService } from './activities.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/users/doamin/entities/user.entity';

@UseGuards(AuthGuard)
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  create(
    @Body() createActivityDto: CreateActivityDto,
    @User() user: UserEntity,
  ) {
    return this.activitiesService.create({
      ...createActivityDto,
      userId: user.id,
    });
  }

  @Get('travel/:travelId')
  findAllByTravel(
    @Param('travelId') travelId: string,
    @User() user: UserEntity,
  ) {
    return this.activitiesService.findAllByTravel(travelId, user.id);
  }

  @Get(':id/travel/:travelId')
  findOneByTravel(
    @Param('id') id: string,
    @Param('travelId') travelId: string,
    @User() user: UserEntity,
  ) {
    return this.activitiesService.findOneByTravel(id, travelId, user.id);
  }

  @Patch(':id/travel/:travelId')
  update(
    @Param('id') id: string,
    @Param('travelId') travelId: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @User() user: UserEntity,
  ) {
    return this.activitiesService.update(
      id,
      travelId,
      user.id,
      updateActivityDto,
    );
  }

  @Delete(':id/travel/:travelId')
  remove(
    @Param('id') id: string,
    @Param('travelId') travelId: string,
    @User() user: UserEntity,
  ) {
    return this.activitiesService.remove(id, travelId, user.id);
  }
}
