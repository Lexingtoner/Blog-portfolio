import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  private comments: CommentEntity[] = [];

  findAllByPost(postId: string): CommentEntity[] {
    return this.comments.filter((c) => c.postId === postId);
  }

  findOne(id: string): CommentEntity {
    const comment = this.comments.find((c) => c.id === id);
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  create(dto: CreateCommentDto): CommentEntity {
    const now = new Date();
    const comment: CommentEntity = {
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

  update(id: string, dto: UpdateCommentDto): CommentEntity {
    const comment = this.findOne(id);
    Object.assign(comment, dto, { updatedAt: new Date() });
    return comment;
  }

  remove(id: string): void {
    const idx = this.comments.findIndex((c) => c.id === id);
    if (idx === -1) throw new NotFoundException('Comment not found');
    this.comments.splice(idx, 1);
  }
}
