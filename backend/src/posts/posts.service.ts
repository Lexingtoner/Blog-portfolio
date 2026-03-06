import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: PostEntity[] = [];

  findAll(): PostEntity[] {
    return this.posts;
  }

  findOne(id: string): PostEntity {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  create(dto: CreatePostDto): PostEntity {
    const now = new Date();
    const post: PostEntity = {
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

  update(id: string, dto: UpdatePostDto): PostEntity {
    const post = this.findOne(id);
    Object.assign(post, dto, { updatedAt: new Date() });
    return post;
  }

  remove(id: string): void {
    const idx = this.posts.findIndex((p) => p.id === id);
    if (idx === -1) throw new NotFoundException('Post not found');
    this.posts.splice(idx, 1);
  }
}
