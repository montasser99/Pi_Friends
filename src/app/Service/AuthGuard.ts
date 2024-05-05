
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if JWT token exists in local storage
    const token = localStorage.getItem('jwt_token');

    // Check if the requested route is login or register
    const isLoginOrRegister = state.url === '/login' || state.url === '/register';

    if (token) {
      // If token exists, user should not be allowed to access login or signup pages
      if (isLoginOrRegister) {
        this.router.navigate(['/dashboard']); // Redirect to dashboard or any other desired route
        return false;
      } 
    }
  }
}
