import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent {
  @Output() closeModal = new EventEmitter<void>();

  // Emit the close event to the parent component
  close() {
    this.closeModal.emit();
  }
  onSubmit(form: NgForm) {
      const blogPost = {
        heading: form.value.blogHeading,
        content: form.value.blogContent,
      };
      console.log(blogPost); 

      this.close();
      form.reset();
  }
}
