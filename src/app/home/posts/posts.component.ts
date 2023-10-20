import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from 'src/shared/components/confirm-dialog/confirm-dialog.component';
import { IPost } from 'src/shared/models/post.model';
import { PostsService } from 'src/shared/services/posts.service';
import { PostDialogComponent } from './post-dialog/post-dialog.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: IPost[] = []

  constructor(
    private postsService: PostsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.postsService.get().subscribe({
      next: (response) => {
        console.log(response)
        this.posts = response
      },
      error: (error) => { console.error(error) }
    })
  }

  onAddClick() {
    let dialogRef = this.dialog.open(PostDialogComponent)

    dialogRef.afterClosed().subscribe({
      next: (dialogResponse) => {
        if (dialogResponse) {
          console.log("risposta del dialog quando si chiude: ", dialogResponse)
          this.posts.push(dialogResponse)
        }
      },
      error: (error) => { console.error(error) }
    })
  }

  onEditClick(post: IPost) {
    let dialogRef = this.dialog.open(PostDialogComponent, {
      data: { post }
    })

    dialogRef.afterClosed().subscribe({
      next: (dialogResponse) => {
        if (dialogResponse) {
          console.log("risposta del dialog quando si chiude: ", dialogResponse)
          let oldPost = this.posts.find(post => post.id === dialogResponse.id)
          if (oldPost) {
            this.posts.splice(this.posts.indexOf(oldPost), 1, dialogResponse)
          }
        }
      },
      error: (error) => { console.error(error) }
    })
  }

  onDeleteClick(id: number) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent)

    dialogRef.afterClosed().subscribe({
      next: (dialogResponse) => {
        if (dialogResponse) {
          this.postsService.delete(id).subscribe({
            next: () => {
              console.log("post eliminato: ", id)
              let oldPost = this.posts.find(post => post.id === id)
              if (oldPost) {
                this.posts.splice(this.posts.indexOf(oldPost), 1)
              }
            },
            error: (httpError: HttpErrorResponse) => {
              this.snackBar.open(httpError.error, "X", {
                duration: 3000
              })
            }
          })
        }
      },
      error: (error) => { console.error(error) }
    })
  }

}
