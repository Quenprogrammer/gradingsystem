import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
/*usage   { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }*/
  return true;
};
