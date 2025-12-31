import { HttpInterceptorFn } from '@angular/common/http';
import { Errorservice } from '../services/errorservice';
import { inject, Injector } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const injector=inject(Injector);

  return next(req).pipe(
    catchError((error)=>{
 const errorhandler:any=error.error;
      const errorResponse: any = {
        name:errorhandler?.name?errorhandler?.name:'Error',
        heading:errorhandler?.heading?errorhandler?.heading:'Error',
        message: errorhandler?.detail?errorhandler?.detail:'Something went wrong!!',
        status: errorhandler?.status?errorhandler?.status:400,
        statusCode:errorhandler?.statusCode,
       

      };
    const errorService = injector.get(Errorservice);
      errorService.handleError(errorResponse);
      return throwError(() => errorResponse);
    })
  )
};
