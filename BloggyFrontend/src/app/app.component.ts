import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  showBlogs !: boolean;

  ngOnInit(): void {
    this.showBlogs = true;
  }

  blogPosts = [
    {
      title: 'First Blog Post Title',
      content:
        'This is the content of the first blog post. It can be a summary or the full content, depending on your preference. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    }
  ];

  // Open and close blog creation
  createOpen = false;
  createBlog(){
    this.createOpen = true;
  }
  closeModal() {
    this.createOpen = false;
  }

  // Open and close comment creation
  writeCommentOpen = false;
  addComment(id:string){
    console.log(id);
    this.writeCommentOpen = true;
  }
  closeWriteComment(){
    this.writeCommentOpen = false;
  }

  // Open and close comments view
  viewCommentOpen = false;
  viewComments(id:string){
    this.viewCommentOpen = true;
  }
  closeViewComment(){
    this.viewCommentOpen = false;
  }

  // Deletion logic
  deleteOpen = false;
  openDelete(id:string){
    this.deleteOpen = true;
  }
  cancelDelete(){
    this.deleteOpen = false
  }
  deletePost(post: any) {
    if (this.blogPosts.length === 0) {
      this.showBlogs = false;
    }
  }
}
