import { Injectable } from '@nestjs/common';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { PreferencesRepository } from './repositories/preferences.repository';

@Injectable()
export class PreferencesService {
  constructor(private readonly preferencesRepository: PreferencesRepository) {}

  create(createPreferenceDto: CreatePreferenceDto) {
    return this.preferencesRepository.create(createPreferenceDto);
  }

  findAllByUser(userId: string) {
    return this.preferencesRepository.findAllByUser(userId);
  }

  findOneByUser(id: string, userId: string) {
    return this.preferencesRepository.findOneByUser(id, userId);
  }

  update(id: string, userId: string, updatePreferenceDto: UpdatePreferenceDto) {
    return this.preferencesRepository.update(id, userId, updatePreferenceDto);
  }

  remove(id: string, userId: string) {
    return this.preferencesRepository.remove(id, userId);
  }
}
