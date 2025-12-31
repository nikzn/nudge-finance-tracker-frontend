import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Authenticationservice } from '../services/authenticationservice';
import { catchError, switchMap, throwError } from 'rxjs';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {

  const skipUrls = ['api/auth/login', 'api/auth/register', 'api/auth/refresh']

  const authService = inject(Authenticationservice)

  if (skipUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  const accessToken = authService.getAccessTokenFromStorage()

  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }



  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401 && accessToken) {
        return authService.refreshTokenApi(accessToken).pipe(
          switchMap((response: any) => {
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`
              }
            })
            return next(retryReq)
          }),
           catchError((refreshError) => {
            // Refresh failed, logout user
            authService.logOut();
            return throwError(() => refreshError);
          }
        ))
      }
       return throwError(() => error);
    }),
 
  )
};
