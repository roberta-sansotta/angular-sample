import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/shared/models/post.model';
import { PostsService } from 'src/shared/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: IPost[] = []

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.postsService.get().subscribe({
      next: (response) => { console.log(response) },
      error: (error) => { console.error(error) }
    })
  }

}
