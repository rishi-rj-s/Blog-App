import { Controller } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { GrpcMethod } from '@nestjs/microservices';
import { BlogResponse } from './blog-service.interface';


@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @GrpcMethod('BlogService', 'CreateBlog')
  async createBlog(data: { title: string, content: string }): Promise<{ success: boolean }> {
    const { title, content } = data;

    const newBlog = new Blog();
    newBlog.title = title;
    newBlog.content = content;

    await this.blogService.create(newBlog);

    return {success:true};
  }

  // gRPC method to handle fetching all blogs
  @GrpcMethod('BlogService', 'GetAllBlogs')
  async getAllBlogs(_: {}): Promise<{ blogs: BlogResponse[] }> {
    const blogs = await this.blogService.findAll();
    const response = blogs.map(blog => ({
      id: blog.id,
      createdAt: blog.created_at.toISOString(),
      title: blog.title,
      content: blog.content,
    }));
    console.log('Returning blogs:', response);
    return { blogs: response };
  }

}