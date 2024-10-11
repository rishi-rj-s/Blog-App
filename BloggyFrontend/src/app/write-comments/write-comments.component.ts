import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-write-comments',
  templateUrl: './write-comments.component.html',
  styleUrl: './write-comments.component.css'
})
export class WriteCommentsComponent {
  @Output() closeModal = new EventEmitter<void>();

  close(){
    this.closeModal.emit();
  }
  onSubmit(form: NgForm) {
    const commentData = {
      name: form.value.name,
      comment: form.value.comment
    };
    
    console.log('Comment Submitted:', commentData);
    this.close();
    form.reset();
  }
}
