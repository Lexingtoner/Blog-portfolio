"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.users = [];
    }
    findAll() {
        return this.users;
    }
    findOne(id) {
        const user = this.users.find((u) => u.id === id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    create(dto) {
        const now = new Date();
        const user = {
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
    update(id, dto) {
        const user = this.findOne(id);
        Object.assign(user, dto, { updatedAt: new Date() });
        return user;
    }
    remove(id) {
        const idx = this.users.findIndex((u) => u.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException('User not found');
        this.users.splice(idx, 1);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map