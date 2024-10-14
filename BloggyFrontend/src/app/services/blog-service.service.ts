import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createBlog(title: string, content: string): Observable<any> {
    const payload = { title, content };
    
    return this.http.post(`${this.apiUrl}/blog`, payload, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          if (response.status === 201) {
            return { data: response.body };
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

  fetchAllBlogs(){
    return this.http.get(`${this.apiUrl}/blog`, { observe: 'response' })
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
