import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(tag?: string): import("./entities/post.entity").PostEntity[];
    findOne(id: string): import("./entities/post.entity").PostEntity;
    create(dto: CreatePostDto): import("./entities/post.entity").PostEntity;
    update(id: string, dto: UpdatePostDto): import("./entities/post.entity").PostEntity;
    remove(id: string): void;
}
//# sourceMappingURL=posts.controller.d.ts.map