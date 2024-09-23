import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/application/service/oauth.service';
import logger from 'src/shared/config/logger';
import { UsersService } from 'src/users/application/service/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = (authorization || '').split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const tokenData = this.authService.checkToken(token);
      logger.info('teste');
      const user = await this.usersService.findOne(tokenData.sub);

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      request.user = user;
      request.tokenPayload = tokenData;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
