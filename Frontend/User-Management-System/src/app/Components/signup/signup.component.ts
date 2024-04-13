import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/Services/authservice.service';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  constructor(private service: AuthserviceService,
    private router: Router) { }


  emailAlreadyExist: boolean = false;
  emailErrorMsg = false;

  signuser: any;
  emailUser: any

  signup = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z ]*')]),
    lname: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z ]*')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    role: new FormControl('Un Assigned'),
    status: new FormControl('In Active'),
  })
  registration(signup: any) {
    console.log('kkkkkk==>', signup)
    // this.service.checkEmail(this.signup.value.email).subscribe((res: any) => {
    //   this.emailUser = res;
    //   console.log("ooojjhgg==>", res)
    //   if (res.length > 0) {
    //     console.log('ppppppppppp========', res)
    //     this.emailErrorMsg = true
    //   }
      // else {
        const data = {
          fname: this.signup.value.fname,
          lname: this.signup.value.lname,
          email: this.signup.value.email,
          password: this.signup.value.password,
          role: this.signup.value.role,
          status: this.signup.value.status
        }
        console.log(this.signup.value)
        this.service.signUp(data).subscribe(res => {
          this.signuser = res;
          console.log('resssssss==>',res)
          // alert("your registration is succesfully, Please verify your email")
          Notiflix.Notify.info("your registration is succesfully, Please verify your email")
          this.router.navigate(['signin'])
        // routerLink="signin"
        },error=>{
          console.log("errrrrrr",error);
          if(error.status==409){
            this.emailErrorMsg = true;
          }
        })

      // }
    // })
  }
}