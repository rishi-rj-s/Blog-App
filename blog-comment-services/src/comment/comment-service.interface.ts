import { Observable } from 'rxjs';
import { Comment } from './entities/comment.entity';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb'; // Import Timestamp
import { CreateCommentDto } from './dto/create-comment.dto';

export interface CommentService {
  createComment(data: { blog_id: string, name: string, comment: string }): Observable<CreateCommentDto>;
  getCommentsForBlog(data: {blogId: string}): Observable<{ comments: Comment[] }>;
}

export interface CommentResponse {
  id: string;
  createdAt: Timestamp; 
  name: string;
  comment: string;
  blogId: string;
}