import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createComment(name: string, comment: string, blogId: string): Observable<any> {
    const payload = { name, comment, blogId };
    
    return this.http.post(`${this.apiUrl}/comments`, payload, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 201) {
            return { success:true };
          } else {
            throw new Error('Unexpected response status');
          }
        }),
        catchError((error) => {
          return throwError(() => ({
            success: false,
            error: error.message || 'An error occurred while creating the comment'
          }));
        })
      );
  }

  fetchAllComments(blogId:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/comments/${blogId}`, { observe: 'response' })
    .pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 200) {
          return { success: true, data: response.body };
        } else {
          throw new Error('Unexpected response status');
        }
      }),
      catchError((error) => {
        return throwError(() => ({
          success: false,
          error: error.message || 'An error occurred while creating the blog'
        }));
      })
    );

  }

}
