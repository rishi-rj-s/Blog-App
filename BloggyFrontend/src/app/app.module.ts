import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { WriteCommentsComponent } from './write-comments/write-comments.component';
import { CommentsComponent } from './comments/comments.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { LoggingInterceptor } from './logging.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    CreateBlogComponent,
    WriteCommentsComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    },
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
