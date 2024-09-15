import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GithubOAuthStrategy } from './infrastructure/strategy/github-oauth.strategy';
import { GoogleOAuthStrategy } from './infrastructure/strategy/google-oauth.strategy';
import { UserRepository } from './infrastructure/repository/user.repository';
import { OAuthAccountRepository } from './infrastructure/repository/oauth-account.repository';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from './infrastructure/strategy/jwt.strategy';
import { AuthService } from './application/service/oauth.service';
import { AppConfigModule } from 'src/shared/infrastructure/env-config/config.module';
import { AppConfigService } from 'src/shared/infrastructure/env-config/config.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: '7d' },
      }),
    }),
    AppConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    GithubOAuthStrategy,
    GoogleOAuthStrategy,
    UserRepository,
    OAuthAccountRepository,
    PrismaService,
  ],
})
export class AuthModule {}
