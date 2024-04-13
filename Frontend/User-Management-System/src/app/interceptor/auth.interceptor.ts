// import { Injectable } from '@angular/core';
// import { HttpInterceptor } from '@angular/common/http';
// import { catchError, Observable } from 'rxjs';
// import { AuthserviceService } from '../Services/authservice.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(private service:AuthserviceService) {}

//   intercept(req:any,next:any) { 
//     let tokenizedReq = req.clone({
//       setHeaders:{
//         authorization : `Bearer ${this.service.getToken()}`
//       }
//     })
//     return next.handle(tokenizedReq);
// }
// }

// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthserviceService } from '../Services/authservice.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private service: AuthserviceService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.service.getToken();

//     if (token) {
//       const tokenizedReq = req.clone({
//         setHeaders: {
//           authorization: `Bearer ${token}`
//         }
//       });

//       return next.handle(tokenizedReq).pipe(
//         catchError((error: any) => {
//           console.log('errrrrrjwtttttt====...',error)
//           if (error.status === 401) {
//             // Handle token expiration or unauthorized access here
//             this.service.isLogOut(); // Remove token from session storage
//           }

//           return throwError(error);
//         })
//       );
//     }

//     return next.handle(req);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthserviceService } from '../Services/authservice.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private service: AuthserviceService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.service.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
    // return next.handle(req).pipe(

    //   catchError((error: any) => {
    //     console.log('errrrrrjwtttttt====', error)
    //     if (error.error.message == 'jwt expired') {
    //       // Token expired or unauthorized
    //       this.service.isLogOut();
    //       this.router.navigate(['signin'])
    //     }
    //     return throwError(error);
    //   })
    // );
  }
}