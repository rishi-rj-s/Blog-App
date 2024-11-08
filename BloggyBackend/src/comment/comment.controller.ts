import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CommentResponse } from './comment-service.interface';
import { isUUID } from 'class-validator';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @GrpcMethod('CommentService', 'CreateComment')
  async createComment(data: { name: string, comment: string, blogId: string }): Promise<{ success: boolean }> {
    const { name, comment, blogId } = data;
    console.log(name, comment, blogId);
    const newComment = new Comment();
    newComment.name = name;
    newComment.comment = comment;
    newComment.blog_id = blogId;
    const result = await this.commentService.createComment(newComment);
    console.log(result)
    return { success: true };
  }

  @GrpcMethod('CommentService', 'getCommentsForBlog')
  async getAllComments(data: { blogId: string }): Promise<{ comments: CommentResponse[] }> {
    if (!isUUID(data.blogId)) {
      throw new Error('Invalid Blog ID');
  }

    console.log('Blog ID received:', data.blogId);
    const comments = await this.commentService.getCommentsByBlogId(data.blogId);
    const response = comments.map(comment => ({
      id: comment.id,
      createdAt: comment.created_at.toISOString(),
      name: comment.name,
      comment: comment.comment,
      blogId: comment.blog_id
    }));
    console.log('Returning comments:', response);
    return { comments: response };
  }

}
