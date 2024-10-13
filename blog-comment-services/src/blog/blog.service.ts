import { Injectable } from '@nestjs/common';
import { Blog } from './entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) { }

  // create a blog
  async create(blog: CreateBlogDto): Promise<Blog> {
    const savedBlog = await this.blogRepository.save(blog);
    console.log('Created blog:', savedBlog); 
    return savedBlog;
  }

  // fetch all blogs
  async findAll(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

}
