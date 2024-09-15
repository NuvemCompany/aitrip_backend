import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/shared/infrastructure/env-config/config.service';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(appConfigService: AppConfigService) {
    super({
      clientID: appConfigService.googleClientId,
      clientSecret: appConfigService.googleClientSecret,
      callbackURL: appConfigService.googleCallbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {
      id: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      picture: profile.photos[0].value,
      provider: 'google',
    };
  }
}
