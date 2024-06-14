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
import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { User } from 'src/common/decorators/user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserEntity } from 'src/users/doamin/entities/user.entity';

@UseGuards(AuthGuard)
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  create(
    @Body() createPreferenceDto: CreatePreferenceDto,
    @User() user: UserEntity,
  ) {
    return this.preferencesService.create({
      ...createPreferenceDto,
      userId: user.id,
    });
  }

  @Get()
  findAllByUser(@User() user: UserEntity) {
    return this.preferencesService.findAllByUser(user.id);
  }

  @Get(':id')
  findOneByUser(@Param('id') id: string, @User() user: UserEntity) {
    return this.preferencesService.findOneByUser(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePreferenceDto: UpdatePreferenceDto,
    @User() user: UserEntity,
  ) {
    return this.preferencesService.update(id, user.id, updatePreferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserEntity) {
    return this.preferencesService.remove(id, user.id);
  }
}
