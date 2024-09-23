import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { LocationService } from '../../application/service/location.service';
import { CreateLocationDto } from '../../domain/dto/create-location.dto';
import { UpdateLocationDto } from '../../domain/dto/update-location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createLocation(createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationService.findAllLocations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findLocationById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.updateLocation(id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.deleteLocation(id);
  }
}
