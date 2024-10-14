import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BlogService } from './services/blog-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  showBlogs !: boolean;
  selectedBlogId: string = '';
  blogs: any[] = [];
  private subscriptions : Subscription[] = [];

  constructor(
    private blogService: BlogService, private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.showBlogs = true;
    const fetching = this.blogService.fetchAllBlogs().subscribe({
      next: (result: any) => {
        console.log(result)
        if (result.success && result.data) {
          this.blogs = result.data;
          if (this.blogs.length === 0) {
            this.showBlogs = false;
          }
        } else {
          this.blogs = [];
          this.showBlogs = false;
        }
      },
      error: (error) => {
        console.error('Error fetching blogs:', error);
      }
    });
    this.subscriptions.push(fetching);
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub=>sub.unsubscribe());
  }

  onBlogCreated() {
    this.ngOnInit();
  }  


  // Open and close blog creation

  createOpen = false;

  createBlog() {
    this.createOpen = true;
  }

  closeModal() {
    this.createOpen = false;
  }

  // Open and close comment creation

  writeCommentOpen = false;

  addComment(id: string) {
    this.selectedBlogId = id;
    this.writeCommentOpen = true;
  }

  closeWriteComment() {
    this.writeCommentOpen = false;
  }

  // Open and close comments view
  viewCommentOpen = false;
  viewComments(id: string) {
    this.selectedBlogId = id;
    this.viewCommentOpen = true;
  }
  closeViewComment() {
    this.viewCommentOpen = false;
  }

}
