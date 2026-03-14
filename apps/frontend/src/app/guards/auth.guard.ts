import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated =
    authService.currentUser() !== null ||
    !!localStorage.getItem('access_token');

  if (isAuthenticated) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
