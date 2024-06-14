// src/preferences/preferences.module.ts
import { Module } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { PreferencesRepository } from './repositories/preferences.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PreferencesController],
  providers: [
    PreferencesService,
    PreferencesRepository,
    UsersService,
    UsersRepository,
    PrismaService,
  ],
})
export class PreferencesModule {}
