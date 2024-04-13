import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../Services/authservice.service';
import * as Notiflix from 'notiflix';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private service: AuthserviceService) { }

  helper = new JwtHelperService();
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // return true;
    const token: any = this.service.getToken();
    const decode = this.helper.decodeToken(token)
    const isExpired = this.helper.isTokenExpired(token)
    console.log('token expiration',isExpired)

    if (token) {
      if (!isExpired) {
      return true
      }
      else {
        this.service.isLogOut();
        // alert('session expired')
        Notiflix.Notify.failure('session expired')
        this.router.navigate(['signin'])
        return false;
      }
    }else {
      this.service.isLogOut();
      this.router.navigate(['signin'])
      return false;
    }

  }

}
