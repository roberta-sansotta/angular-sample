import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPost } from 'src/shared/models/post.model';
import { PostsService } from 'src/shared/services/posts.service';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent {

  postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { post: IPost } | null,
    public dialogRef: MatDialogRef<PostDialogComponent>,
    private postService: PostsService,
    private snackBar: MatSnackBar
  ) {
    if (data) {
      this.postForm.patchValue({
        title: data.post.title,
        author: data.post.author
      })
      this.postForm.updateValueAndValidity()
    }
  }

  onPostSubmit() {
    console.log("valori del form nel submit: ", this.postForm.value)

    let values = {
      title: this.postForm.value.title ? this.postForm.value.title : "",
      author: this.postForm.value.author ? this.postForm.value.author : "",
    }

    if (this.data) {
      this.postService.put(this.data.post.id, values).subscribe({
        next: (response) => {
          console.log(response)
          this.dialogRef.close(response)
        },
        error: (httpError: HttpErrorResponse) => {
          console.error(httpError)
          this.snackBar.open(httpError.error, "X", {
            duration: 3000
          })
        }
      })
    } else {
      this.postService.post(values).subscribe({
        next: (response) => {
          console.log(response)
          this.dialogRef.close(response)
        },
        error: (httpError: HttpErrorResponse) => {
          console.error(httpError)
          this.snackBar.open(httpError.error, "X", {
            duration: 3000
          })
        }
      })
    }
  }
}
