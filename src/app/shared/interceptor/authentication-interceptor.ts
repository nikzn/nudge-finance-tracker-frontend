import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Authenticationservice } from '../services/authenticationservice';
import { catchError, switchMap, throwError } from 'rxjs';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(Authenticationservice);

  const skipUrls = [
    'api/auth/login',
    'api/auth/register',
    'api/auth/refresh'
  ];

  if (skipUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  const accessToken = authService.getAccessTokenFromStorage();

  const authReq = accessToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401 && !req.url.includes('api/auth/refresh')) {

        const refreshToken = authService.getRefreshTokenFromStorage();

        if (!refreshToken) {
          authService.logOut();
          return throwError(() => error);
        }

        return authService.refreshTokenApi(refreshToken).pipe(
          switchMap((response: any) => {

            authService.setAccessToken(
              response.accessToken);

              authService.setRefreshToken(response.refreshToken)

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`
              }
            });

            return next(retryReq);
          }),
          catchError(refreshError => {
            authService.logOut();
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
