import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepository.create(createCommentDto);
    console.log(comment)
    return await this.commentRepository.save(comment);
  }

  async getCommentsByBlogId(blogId: string): Promise<Comment[]> {
    console.log('Blog ID received:', blogId);
    const comments = await this.commentRepository.find({ where: { blog_id : blogId } });
    console.log('Fetched comments:', comments);
    return comments;
  }
}
