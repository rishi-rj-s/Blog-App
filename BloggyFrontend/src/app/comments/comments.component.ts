import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentService } from '../services/comment-service.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
  providers: [CommonModule]
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter<void>();
  @Input() blogId!: string;

  private subscriptions : Subscription[] = [];
  comments: any[] = [];

  constructor(
    private commentService : CommentService
  ){}

  close() {
    this.closeModal.emit();
  }

  ngOnInit(): void {
    const fetching = this.commentService.fetchAllComments(this.blogId).subscribe({
      next: (result: any) => {
        console.log(result)
        if (result.success && result.data) {
          this.comments = result.data;
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

}
