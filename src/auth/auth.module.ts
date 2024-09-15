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

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
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
