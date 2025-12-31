import { HttpInterceptorFn } from '@angular/common/http';
import { Loaderservice } from '../services/loaderservice';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
const loadingService=inject(Loaderservice)
  loadingService.setLoading(true, req.url);

  return next(req).pipe(
    finalize(() => {
      // Hide loader
      loadingService.setLoading(false, req.url);
    })
  );

};
