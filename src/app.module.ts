import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config/env-config.module';
import { PreferencesModule } from './preferences/preferences.module';

@Module({
  imports: [AuthModule, UsersModule, EnvConfigModule, PreferencesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
