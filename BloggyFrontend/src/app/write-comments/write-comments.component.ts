import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentService } from '../services/comment-service.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-write-comments',
  templateUrl: './write-comments.component.html',
  styleUrl: './write-comments.component.css'
})
export class WriteCommentsComponent implements OnDestroy {
  @Output() closeModal = new EventEmitter<void>();
  @Input() blogId!: string;
  private subscriptions: Subscription[] = []

  constructor(
    private commentService: CommentService,
    private toastr: ToastrService
  ){}

  close(){
    this.closeModal.emit();
  }
  onSubmit(form: NgForm) {
    const commentData = {
      name: form.value.name,
      comment: form.value.comment,
    };
    
    const creation = this.commentService.createComment(commentData.name, commentData.comment, this.blogId).subscribe({
      next: (response) => {
        console.log('Comment created successfully:', response.data);
        this.toastr.success('Comment posted!', 'Success'); 
        this.close(); 
        form.reset(); 
      },
      error: (error) => {
        console.error('Error creating comment:', error.error.message);
        this.toastr.error(error.error.message || 'An error occurred while creating the comment', 'Error'); // Show error message
      }
    });  
    this.subscriptions.push(creation);
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach(sub=>{
        sub.unsubscribe()
      })
  }
}
