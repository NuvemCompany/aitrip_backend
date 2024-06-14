import { Injectable } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { AuthRepository } from './repositories/auth.repository';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import { UserEntity } from 'src/users/doamin/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly repository: AuthRepository,
  ) {}

  async createToken(user: UserEntity) {
    try {
      const accessToken = this.jwtService.sign(
        {
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7d',
          subject: user.id as string,
        },
      );

      return {
        accessToken,
      };
    } catch (error) {
      throw new UnauthorizedError(error.message);
    }
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

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.repository.login(authLoginDto);
    return this.createToken(user);
  }

  async register(authRegisterDto: AuthRegisterDto) {
    const user = await this.repository.register(authRegisterDto);
    return this.createToken(user);
  }

  async forget(authForgetDto: AuthForgetDto) {
    console.log(authForgetDto);
    // return this.jwtService.sign();
  }

  async reset(authResetDto: AuthResetDto) {
    console.log(authResetDto);
  }
}
