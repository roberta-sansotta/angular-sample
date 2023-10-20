import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe({
      next: (value) => {
        console.log(value)
      },
      error: () => { },
      complete: () => { }
    })
  }

  onLoginSubmit() {
    console.log("dati del login nel submit: ", this.loginForm.value)
    let values = {
      email: this.loginForm.value.email ? this.loginForm.value.email : "",
      password: this.loginForm.value.password ? this.loginForm.value.password : ""
    }
    this.authService.login(values).subscribe({
      next: (response) => {
        console.log("response: ", response)
        let authData = JSON.stringify(response)
        sessionStorage.setItem("auth", authData)
        this.router.navigateByUrl('/home')
      },
      error: (httpError: HttpErrorResponse) => {
        console.error(httpError)
        this.snackBar.open(httpError.error, "X", {
          duration: 3000
        })
      },
      complete: () => { console.log("comunicazione terminata") }
    })
  }

}
