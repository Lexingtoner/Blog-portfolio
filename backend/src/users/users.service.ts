import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [];

  findAll(): UserEntity[] {
    return this.users;
  }

  findOne(id: string): UserEntity {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(dto: CreateUserDto): UserEntity {
    const now = new Date();
    const user: UserEntity = {
      id: `user_${Math.random().toString(36).slice(2)}`,
      email: dto.email,
      name: dto.name,
      bio: dto.bio,
      createdAt: now,
      updatedAt: now,
    };
    this.users.push(user);
    return user;
  }

  update(id: string, dto: UpdateUserDto): UserEntity {
    const user = this.findOne(id);
    Object.assign(user, dto, { updatedAt: new Date() });
    return user;
  }

  remove(id: string): void {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException('User not found');
    this.users.splice(idx, 1);
  }
}
