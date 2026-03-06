"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
let CommentsService = class CommentsService {
    constructor() {
        this.comments = [];
    }
    findAllByPost(postId) {
        return this.comments.filter((c) => c.postId === postId);
    }
    findOne(id) {
        const comment = this.comments.find((c) => c.id === id);
        if (!comment)
            throw new common_1.NotFoundException('Comment not found');
        return comment;
    }
    create(dto) {
        const now = new Date();
        const comment = {
            id: `comment_${Math.random().toString(36).slice(2)}`,
            postId: dto.postId,
            authorId: dto.authorId,
            content: dto.content,
            createdAt: now,
            updatedAt: now,
        };
        this.comments.push(comment);
        return comment;
    }
    update(id, dto) {
        const comment = this.findOne(id);
        Object.assign(comment, dto, { updatedAt: new Date() });
        return comment;
    }
    remove(id) {
        const idx = this.comments.findIndex((c) => c.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException('Comment not found');
        this.comments.splice(idx, 1);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)()
], CommentsService);
//# sourceMappingURL=comments.service.js.map