import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthResponse } from '../models/auth.model';

type AuthBody = {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  register(body: AuthBody): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>("http://localhost:3000/register", body)
  }

  login(body: AuthBody): Observable<IAuthResponse> {
    return this.httpClient.post<IAuthResponse>("http://localhost:3000/login", body)
  }
}
