import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../Services/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  
  constructor(private router: Router, private service: AuthserviceService) { }

  helper = new JwtHelperService();
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return true; 
    // const token: any = this.service.getToken();
    // const decode = this.helper.decodeToken(token)
    // const isExpired = this.helper.isTokenExpired(token)
    // console.log('token expiration',isExpired)

    //   if(decode.role=='Admin'){ 
    //     return true;
    //   }
    //   else{
    //     this.router.navigate(['dashboard'])
    //     return false;
    //   }
  
}
}
