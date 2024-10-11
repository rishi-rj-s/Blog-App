import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { WriteCommentsComponent } from './write-comments/write-comments.component';
import { CommentsComponent } from './comments/comments.component';
import { DeleteBlogsComponent } from './delete-blogs/delete-blogs.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreateBlogComponent,
    WriteCommentsComponent,
    CommentsComponent,
    DeleteBlogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
