import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from 'src/users/doamin/entities/user.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from 'src/users/infrastructure/database/prisma-user.repository';
import logger from 'src/shared/config/logger';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.repository.create(createUserDto);
    return newUser;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.repository.findAll();
    return users;
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.repository.findOne(id);

    logger.info({
      user: user,
      id,
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = this.repository.update(id, updateUserDto);
    return updatedUser;
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
