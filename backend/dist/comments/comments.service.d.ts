import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
export declare class CommentsService {
    private comments;
    findAllByPost(postId: string): CommentEntity[];
    findOne(id: string): CommentEntity;
    create(dto: CreateCommentDto): CommentEntity;
    update(id: string, dto: UpdateCommentDto): CommentEntity;
    remove(id: string): void;
}
//# sourceMappingURL=comments.service.d.ts.map