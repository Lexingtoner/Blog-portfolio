import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    findAllByPost(postId: string): import("./entities/comment.entity").CommentEntity[];
    findOne(id: string): import("./entities/comment.entity").CommentEntity;
    create(dto: CreateCommentDto): import("./entities/comment.entity").CommentEntity;
    update(id: string, dto: UpdateCommentDto): import("./entities/comment.entity").CommentEntity;
    remove(id: string): void;
}
//# sourceMappingURL=comments.controller.d.ts.map