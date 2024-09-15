import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './shared/infrastructure/env-config/config.module';

@Module({
  imports: [PrismaModule, AuthModule, AppConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
