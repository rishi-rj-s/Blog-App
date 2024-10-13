import { Observable } from 'rxjs';
import { Blog } from './entities/blog.entity';

export interface BlogService {
  createBlog(data: { title: string, content: string }): Observable<any>;
  getAllBlogs(data: {}): Observable<{ blogs: Blog[] }>;
}

export interface BlogResponse {
  id: string;
  createdAt: string;
  title: string;
  content: string;
}
