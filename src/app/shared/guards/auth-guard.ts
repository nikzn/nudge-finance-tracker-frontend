import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authenticationservice } from '../services/authenticationservice';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(Authenticationservice)
  const router = inject(Router)
  
  if(authService.isAuthenticated()){
    return true
  }else{
    return router.navigate(['/access-denied'])
  }

};
