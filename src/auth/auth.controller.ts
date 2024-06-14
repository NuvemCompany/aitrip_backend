import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('register')
  register(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto);
  }

  @Post('forget-password')
  forget(@Body() authForgetDto: AuthForgetDto) {
    return this.authService.forget(authForgetDto);
  }

  @Post('reset-password')
  reset(@Body() authResetDto: AuthResetDto) {
    return this.authService.reset(authResetDto);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  me(@User() user) {
    return { me: user };
    // return this.authService.checkToken(authorization);
  }
}
