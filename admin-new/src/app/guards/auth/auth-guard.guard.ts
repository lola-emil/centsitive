import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: "root"
})
export class PermissionService {
  constructor(
    private router: Router
  ) {}

  authGuard(auth: AuthService) {
    if (!auth.isAuthenticated()) {
      this.router.navigate(["/signin"]);
      return false;
    }

    return true;
  }
}

export const authGuardGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).authGuard(inject(AuthService));
};
