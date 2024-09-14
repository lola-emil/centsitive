import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../repository/auth/auth.service';
import { state } from '@angular/animations';


@Injectable({
  providedIn: "root"
})
export class PermissionService {
  constructor(private router: Router) {}

  loginGuard(authService: AuthService) {
    if (!authService.isAuthenticated())
      return true;

    return false;
  }

  authGuard(authService: AuthService) {

    if (!authService.isAuthenticated()) {
      this.router.navigate(["/login"]);
      return false;
    }

    return true;
  }
}

export const loginGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).loginGuard(inject(AuthService));
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).authGuard(inject(AuthService));
};
