import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-blogs',
  templateUrl: './delete-blogs.component.html',
  styleUrl: './delete-blogs.component.css'
})
export class DeleteBlogsComponent {
  @Output() closeModal = new EventEmitter<void>();

  // Emit the close event to the parent component
  cancel() {
    this.closeModal.emit();
  }
  delete(id:string){
    
  }
}
