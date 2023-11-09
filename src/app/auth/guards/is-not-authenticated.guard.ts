import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';
import { tap } from 'rxjs'

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const router = inject(Router)

  console.log(authService.authStatus());


  if (authService.authStatus() === AuthStatus.autheticated) {
    // router.navigateByUrl('/dashboard');
    return false;
  }

  // console.log(
  //   authService.checkAuthStatus()
  //     .pipe(
  //       tap(isAuth => {
  //         if (!isAuth) {
  //           router.navigateByUrl('/auth/login');
  //         }
  //       })
  //     ));
  return true;
};

