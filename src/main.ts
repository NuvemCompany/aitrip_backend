import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppConfigService } from './shared/infrastructure/env-config/config.service';

import { AppModule } from './app.module';
import { NotFoundInterceptor } from './common/errors/interceptors/notfound.interceptor';
import { UnauthorizedInterceptor } from './common/errors/interceptors/unauthorized.interceptor';
import { ConflictInterceptor } from './common/errors/interceptors/conflict.interceptor';
import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const appConfigService = app.get(AppConfigService);
  app.enableCors({
    origin: appConfigService.frontendUrl,
    credentials: true,
  });

  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());

  await app.listen(appConfigService.port);
}
bootstrap();
