import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from "../services/auth.service";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn       // {1}
      .take(1)                               // {2}
      .map((isLoggedIn: boolean) => {        // {3}
        if (!isLoggedIn) {
          this.router.navigate(['/login']);  // {4}
          return false;
        }
        return true;
      });
    /*if (localStorage.getItem('token')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;*/
  }
}
