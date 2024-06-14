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
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { TravelsService } from './travels.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { UserEntity } from 'src/users/doamin/entities/user.entity';

@UseGuards(AuthGuard)
@Controller('travels')
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Post()
  create(@Body() createTravelDto: CreateTravelDto, @User() user: UserEntity) {
    return this.travelsService.create({
      ...createTravelDto,
      userId: user.id,
    });
  }

  @Get()
  findAllByUser(@User() user: UserEntity) {
    return this.travelsService.findAllByUser(user.id);
  }

  @Get(':id')
  findOneByUser(@Param('id') id: string, @User() user: UserEntity) {
    return this.travelsService.findOneByUser(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTravelDto: UpdateTravelDto,
    @User() user: UserEntity,
  ) {
    return this.travelsService.update(id, user.id, updateTravelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserEntity) {
    return this.travelsService.remove(id, user.id);
  }
}
