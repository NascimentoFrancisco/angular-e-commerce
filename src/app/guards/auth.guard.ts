import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const authService = inject(AuthService);

  const allowedPaths = ["user/create-edit"];
  if (allowedPaths.some(path => state.url.includes(path))) {
      return true;
  }

  if(authService.getInfoAuth("accessToken") === null){
    router.navigate(["login"]);
    return false;
  }

  return true;
};
