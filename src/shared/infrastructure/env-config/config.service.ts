import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './env.schema';

@Injectable()
export class AppConfigService {
  private readonly envConfig: EnvConfig;

  constructor(private configService: ConfigService) {
    const envConfig = configService.get<EnvConfig>('envConfig');
    if (!envConfig) {
      throw new Error('Configuration not found');
    }
    this.envConfig = envConfig;
  }

  get port(): number {
    return this.envConfig.APP_PORT;
  }

  get nodeEnv(): string {
    return this.envConfig.NODE_ENV;
  }

  get jwtSecret(): string {
    return this.envConfig.JWT_SECRET;
  }

  get frontendUrl(): string {
    return this.envConfig.FRONTEND_URL;
  }

  get frontendLoginCallbackEndpoint(): string {
    return this.envConfig.FRONTEND_LOGIN_CALLBACK_ENDPOINT;
  }

  get dbHost(): string {
    return this.envConfig.DB_HOST;
  }

  get dbPort(): number {
    return this.envConfig.DB_PORT;
  }

  get dbUser(): string {
    return this.envConfig.DB_USER;
  }

  get dbPassword(): string {
    return this.envConfig.DB_PASSWORD;
  }

  get dbName(): string {
    return this.envConfig.DB_NAME;
  }

  get databaseUrl(): string {
    return this.envConfig.DATABASE_URL;
  }

  get githubClientId(): string {
    return this.envConfig.GITHUB_CLIENT_ID;
  }

  get githubClientSecret(): string {
    return this.envConfig.GITHUB_CLIENT_SECRET;
  }

  get githubCallbackUrl(): string {
    return this.envConfig.GITHUB_CALLBACK_URL;
  }

  get googleClientId(): string {
    return this.envConfig.GOOGLE_CLIENT_ID;
  }

  get googleClientSecret(): string {
    return this.envConfig.GOOGLE_CLIENT_SECRET;
  }

  get googleCallbackUrl(): string {
    return this.envConfig.GOOGLE_CALLBACK_URL;
  }

  get redisHost(): string {
    return this.envConfig.REDIS_HOST;
  }

  get redisPort(): number {
    return this.envConfig.REDIS_PORT;
  }
}
