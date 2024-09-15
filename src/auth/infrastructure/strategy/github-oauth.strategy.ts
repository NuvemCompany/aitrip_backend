import { Strategy, Profile } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AppConfigService } from 'src/shared/infrastructure/env-config/config.service';

@Injectable()
export class GithubOAuthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(appConfigService: AppConfigService) {
    super({
      clientID: appConfigService.githubClientId,
      clientSecret: appConfigService.githubClientSecret,
      callbackURL: appConfigService.githubCallbackUrl,
      scope: ['user:email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      id: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      image: profile.photos[0].value,
      provider: 'github',
    };
  }
}
