import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppConfigService } from './shared/infrastructure/env-config/config.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const appConfigService = app.get(AppConfigService);
  app.enableCors({
    origin: appConfigService.frontendUrl,
    credentials: true,
  });

  await app.listen(appConfigService.port);
}
bootstrap();
