import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get() {
    return this.httpClient.get("http://localhost:3000/posts")
  }

  getOne() {

  }

  post() {

  }

  put() {

  }

  delete() {

  }
}
