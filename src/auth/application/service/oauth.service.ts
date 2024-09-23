import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../infrastructure/repository/user.repository';
import { OAuthAccountRepository } from '../../infrastructure/repository/oauth-account.repository';
import { User } from '@prisma/client';
import Redis, { Redis as RedisClient } from 'ioredis';
import { AppConfigService } from 'src/shared/infrastructure/env-config/config.service';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';

@Injectable()
export class AuthService {
  // Redis client
  private redisClient: RedisClient;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly oauthAccountRepository: OAuthAccountRepository,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {
    this.redisClient = new Redis({
      host: this.appConfigService.redisHost,
      port: this.appConfigService.redisPort,
    });
  }

  async storeAuthCode(code: string, user: User): Promise<void> {
    await this.redisClient.set(
      `auth_code:${code}`,
      JSON.stringify(user),
      'EX',
      5 * 60, // Expires in 5 minutes
    );
  }

  // Function to retrieve user data by auth code
  async getUserByAuthCode(code: string): Promise<User | null> {
    const data = await this.redisClient.get(`auth_code:${code}`);

    if (!data) {
      return null;
    }

    // Optionally delete the code after retrieval
    await this.redisClient.del(`auth_code:${code}`);

    return JSON.parse(data);
  }

  async deleteAuthCode(code: string): Promise<void> {
    await this.redisClient.del(`auth_code:${code}`);
  }

  // Existing method to validate OAuth login
  async validateOAuthLogin(
    provider: string,
    providerUserId: string,
    profile: any,
  ): Promise<{ user: User; token: string }> {
    let user = await this.userRepository.findByEmail(profile.email);

    if (!user) {
      user = await this.userRepository.create({
        email: profile.email,
        name: profile.name,
        image: profile.picture,
        emailVerifiedAt: new Date(),
        password: '',
      });

      await this.oauthAccountRepository.create({
        provider,
        providerUserId,
        accessToken: profile.accessToken,
        refreshToken: profile.refreshToken,
        user: {
          connect: { id: user.id },
        },
      });
    }

    const token = await this.generateJwt(user);

    return { user, token };
  }

  // Function to generate JWT
  async generateJwt(user: User): Promise<string> {
    const payload = {
      email: user.email,
      sub: user.id,
      name: user.name,
      image: user.image,
      tokenType: 'Bearer',
      emailVerifiedAt: user.emailVerifiedAt,
    };
    return this.jwtService.sign(payload);
  }

  checkToken(token: string) {
    try {
      const tokenData = this.jwtService.verify(token, {
        ignoreExpiration: false,
      });
      return tokenData;
    } catch (error) {
      throw new UnauthorizedError(error.message);
    }
  }

  isValidToken(token: string) {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
