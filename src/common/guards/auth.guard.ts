import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/users/doamin/entities/user.entity';
import { UsersService } from 'src/users/users.service';

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
    const isValidToken = this.authService.isValidToken(token);

    try {
      const tokenData = this.authService.checkToken(token);
      const user: UserEntity = await this.usersService.findOne(tokenData.sub);

      request.user = user;
      request.tokenPayload = tokenData;
    } catch (error) {
      return false;
    }

    return isValidToken;
  }
}
