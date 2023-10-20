import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IAuthResponse } from '../models/auth.model';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  console.log("rotta attivata: ", route);
  console.log("stato del router: ", state);

  let authData = sessionStorage.getItem("auth")
  if (authData !== null) {
    let parsedData: IAuthResponse = JSON.parse(authData)
    if (parsedData.accessToken) {
      return true
    } else {
      router.navigateByUrl('/login')
      return false
    }
  } else {
    router.navigateByUrl('/login')
    return false;
  }

};
