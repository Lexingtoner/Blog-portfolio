import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
export declare class PostsService {
    private posts;
    findAll(): PostEntity[];
    findOne(id: string): PostEntity;
    create(dto: CreatePostDto): PostEntity;
    update(id: string, dto: UpdatePostDto): PostEntity;
    remove(id: string): void;
}
//# sourceMappingURL=posts.service.d.ts.map