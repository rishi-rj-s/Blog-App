import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
  providers: [CommonModule]
})
export class CommentsComponent {
  @Output() closeModal = new EventEmitter<void>();

  // Emit the close event to the parent component
  close() {
    this.closeModal.emit();
  }
}
