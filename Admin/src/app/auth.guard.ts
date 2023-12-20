import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = new Router();
  let auth = sessionStorage.getItem('auth');
  if (!auth) {
    router.navigate(['login']);
    return false;
  }
  
  return true;
};
