import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
export declare class UsersService {
    private users;
    findAll(): UserEntity[];
    findOne(id: string): UserEntity;
    create(dto: CreateUserDto): UserEntity;
    update(id: string, dto: UpdateUserDto): UserEntity;
    remove(id: string): void;
}
//# sourceMappingURL=users.service.d.ts.map