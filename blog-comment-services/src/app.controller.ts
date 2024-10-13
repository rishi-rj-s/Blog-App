import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { BlogService } from './blog/blog-service.interface';
import { CommentService } from './comment/comment-service.interface';
import { CreateBlogDto } from './blog/dto/create-blog.dto';
import { CreateCommentDto } from './comment/dto/create-comment.dto';
import { json } from 'stream/consumers';
import { Blog } from './blog/entities/blog.entity';
import { Comment } from './comment/entities/comment.entity';

@Controller('api')
export class AppController {
  private blogService: BlogService;
  private commentService: CommentService;

  constructor(
    @Inject('BLOG_PACKAGE') private readonly client: ClientGrpc,
    @Inject('COMMENT_PACKAGE') private readonly commentClient: ClientGrpc
  ) { }

  onModuleInit() {
    this.blogService = this.client.getService<BlogService>('BlogService');
    this.commentService = this.commentClient.getService<CommentService>('CommentService');
  }

  @Post('blog')
  async createBlog(@Body() createBlogDto: CreateBlogDto): Promise<boolean> {
    try {
      const result = await firstValueFrom(this.blogService.createBlog(createBlogDto));
      console.log("Result",result);
      return true;
    } catch (error) {
      throw error;
    }
  }
  
  @Get('comments/:id')
  async getComments(@Param('id') blog_id: string){
    try {
      const result = await firstValueFrom(this.commentService.getCommentsForBlog({blogId: blog_id}));
      console.log('Fetched comments:', result.comments);
      return result.comments;
    } catch (error) {
      throw error;
    }
  }

  @Post('comments')
  async createComment(@Body() createCommentDto: CreateCommentDto) {
    try {
      const result = await this.commentService.createComment(createCommentDto);
      return result;
    } catch (error) {
      throw error;
    }
  }


  @Get('blog')
  async getAllBlogs() {
    try {
      const result = await firstValueFrom(this.blogService.getAllBlogs({}));
      return result.blogs;
    } catch (error) {
      throw error;
    }
  }

}