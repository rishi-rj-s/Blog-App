import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('HTTP Request:', {
      url: req.url,
      method: req.method,
      body: req.body,
      headers: req.headers.keys().reduce((acc, key) => ({ ...acc, [key]: req.headers.get(key) }), {})
    });

    return next.handle(req);
  }
}
