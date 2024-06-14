import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthError } from 'src/common/errors/types/AuthError';
import * as bcrypt from 'bcrypt';

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
        isTwoFactorEnabled: createUserDto.isTwoFactorEnabled,
      },
    });

    return newUser;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        accounts: true,
        sessions: true,
        travels: true,
        preferences: true,
        itineraries: true,
        feedbacks: true,
      },
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        accounts: true,
        sessions: true,
        travels: true,
        preferences: true,
        itineraries: true,
        feedbacks: true,
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
        isTwoFactorEnabled: updateUserDto.isTwoFactorEnabled,
      },
    });
    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  }
}
