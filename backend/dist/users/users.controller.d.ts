import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): import("./entities/user.entity").UserEntity[];
    findOne(id: string): import("./entities/user.entity").UserEntity;
    create(dto: CreateUserDto): import("./entities/user.entity").UserEntity;
    update(id: string, dto: UpdateUserDto): import("./entities/user.entity").UserEntity;
    remove(id: string): void;
}
//# sourceMappingURL=users.controller.d.ts.map