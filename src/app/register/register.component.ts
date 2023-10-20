import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe({
      next: (value) => {
        console.log(value)
      },
      error: () => { },
      complete: () => { }
    })
  }

  onRegisterSubmit() {
    console.log("valori del form nel submit: ", this.registerForm.value)
    let values = {
      email: this.registerForm.value.email ? this.registerForm.value.email : "",
      password: this.registerForm.value.password ? this.registerForm.value.password : ""
    }
    this.authService.register(values).subscribe({
      next: (response) => {
        console.log("risposta del server alla registrazione: ", response)
        this.snackBar.open("Registrazione avvenuta con successo!", "X", {
          duration: 3000
        })
        this.router.navigateByUrl('/login')
      },
      error: (httpError: HttpErrorResponse) => {
        console.error("Errore: ", httpError)
        this.snackBar.open(httpError.error, "X", {
          duration: 3000
        })
      },
      complete: () => { console.log("comunicazione terminata") }
    })
  }

}
