import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPost } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>("http://localhost:3000/posts")
  }

  getOne(id: number): Observable<IPost> {
    return this.httpClient.get<IPost>("http://localhost:3000/posts/" + id)
  }

  post(body: { title: string, author: string }): Observable<IPost> {
    return this.httpClient.post<IPost>("http://localhost:3000/posts", body)
  }

  put(id: number, body: { title: string, author: string }): Observable<IPost> {
    return this.httpClient.put<IPost>("http://localhost:3000/posts/" + id, body)
  }

  delete(id: number): Observable<number> {
    return this.httpClient.delete<number>("http://localhost:3000/posts/" + id).pipe(map(() => id))
  }
}
