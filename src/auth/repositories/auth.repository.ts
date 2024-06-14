import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthLoginDto } from '../dto/auth-login.dto';
import { AuthRegisterDto } from '../dto/auth-register.dto';
import { ConflictError } from 'src/common/errors/types/ConflictError';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async login({ email, password }: AuthLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user || !(await this.comparePasswords(password, user.password))) {
      throw new ConflictError('Email or password is incorrect');
    }

    return user;
  }

  async register(authRegisterDto: AuthRegisterDto) {
    try {
      const newUser = await this.usersRepository.create({
        ...authRegisterDto,
      });
      return newUser;
    } catch (error) {
      throw new ConflictError('Error, please try again.');
    }
  }

  async comparePasswords(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
