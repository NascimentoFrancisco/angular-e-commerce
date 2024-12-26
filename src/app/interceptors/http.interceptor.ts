import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthService);
  const accessToken = authService.getInfoAuth("accessToken");
  const refreshToken = authService.getInfoAuth("refreshToken");

  if (accessToken){
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(error.status === 401 && !req.url.includes("/token/refresh/") && refreshToken){
        return authService.refreshToken().pipe(
          switchMap((response: any) => {
            authService.setInfoAuth("accessToken", response.access);
            const cloneReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.access}`
              }
            });
            return next(cloneReq);
          }),
          catchError((innerError: HttpErrorResponse) => {
            if(innerError.status === 401){
              authService.logout();
            }
            return throwError(() => innerError);
          })
        );
      }
      return throwError(() => error);
    })
  );

};
