import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { AuthError } from 'src/common/errors/types/AuthError';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/application/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/application/dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;

    if (password !== confirm_password) {
      throw new AuthError('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role,
        image: createUserDto.image,
        emailVerifiedAt: createUserDto.emailVerifiedAt,
      },
    });

    return newUser;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      include: {
        accounts: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        accounts: true,
      },
    });

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        role: updateUserDto.role,
        image: updateUserDto.image,
        emailVerifiedAt: updateUserDto.emailVerifiedAt,
      },
    });
    return updatedUser;
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
