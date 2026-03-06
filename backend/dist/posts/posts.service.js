"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
let PostsService = class PostsService {
    constructor() {
        this.posts = [];
    }
    findAll() {
        return this.posts;
    }
    findOne(id) {
        const post = this.posts.find((p) => p.id === id);
        if (!post)
            throw new common_1.NotFoundException('Post not found');
        return post;
    }
    create(dto) {
        const now = new Date();
        const post = {
            id: `post_${Math.random().toString(36).slice(2)}`,
            title: dto.title,
            content: dto.content,
            authorId: dto.authorId,
            tags: dto.tags || [],
            published: !!dto.published,
            createdAt: now,
            updatedAt: now,
        };
        this.posts.push(post);
        return post;
    }
    update(id, dto) {
        const post = this.findOne(id);
        Object.assign(post, dto, { updatedAt: new Date() });
        return post;
    }
    remove(id) {
        const idx = this.posts.findIndex((p) => p.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException('Post not found');
        this.posts.splice(idx, 1);
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)()
], PostsService);
//# sourceMappingURL=posts.service.js.map