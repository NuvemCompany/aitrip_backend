import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UserEntity } from './doamin/entities/user.entity';

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
