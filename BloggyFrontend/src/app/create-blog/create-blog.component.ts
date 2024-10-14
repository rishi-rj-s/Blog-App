import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlogService } from '../services/blog-service.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent implements OnDestroy {
  @Output() closeModal = new EventEmitter<void>();
  @Output() blogCreated = new EventEmitter<any>();

  private subscriptions: Subscription[] = [];



  constructor(
    private blogService: BlogService,
    private toastr: ToastrService,
  ) { }

  // Emit the close event to the parent component
  close() {
    this.closeModal.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    });
  }

  onSubmit(form: NgForm) {
    const blogPost = {
      title: form.value.blogHeading,
      content: form.value.blogContent,
    };

    const creation = this.blogService.createBlog(blogPost.title, blogPost.content).subscribe({
      next: (response) => {
        console.log('Blog created successfully:', response.data);
        this.toastr.success('Blog created successfully!', 'Success');
        this.close();
        form.reset();
        this.blogCreated.emit();
      },
      error: (error) => {
        console.error('Error creating blog:', error.error.message);
        this.toastr.error(error.error.message || 'An error occurred while creating the blog', 'Error'); // Show error message
      }
    });
    this.subscriptions.push(creation);
  }

}
