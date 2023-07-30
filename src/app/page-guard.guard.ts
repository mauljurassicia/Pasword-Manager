import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { PasswordManagerService } from './password-manager.service';
import { inject } from '@angular/core';
import { from, Observable,  map } from 'rxjs';

export const pageGuardGuard: CanActivateFn = 
(route, state) => {
  const router = inject(Router);

  if(localStorage.getItem('passwordkey')){
    return true;
  }
  return router.parseUrl('');
  
};
