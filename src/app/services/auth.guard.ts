import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../api/users.service';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, public userService: UsersService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // | Observable<boolean | UrlTree>
    // | Promise<boolean | UrlTree>
    // | boolean
    // | UrlTree {
      // {
        const isAuth = this.userService.getIsAuth();
        if (!isAuth) {
          this.router.navigate(['/']);
        }
        return isAuth;
      // }
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     const user = await this.authService.getUser();
    //     if (user) {
    //       resolve(true);
    //     } else {
    //       reject('No user logged in');
    //       this.router.navigateByUrl('/login');
    //     }
    //   } catch (error) {
    //     reject(error);
    //   }
    // });
  }
}
