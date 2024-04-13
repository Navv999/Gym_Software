import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
// import auth0 from "auth0-js";
// import { CookieService } from "ngx-cookie-service";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { MatDialog } from "@angular/material/dialog";
// import { ReCaptcha2Component } from 'ngx-captcha';
import { AuthserviceService } from 'src/app/Services/authservice.service';
import jwt_decode from "jwt-decode";
import * as Notiflix from 'notiflix';
// import { CookieService } from "ngx-cookie-service";



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  // passwordNotMatch: boolean = false;
  // emailNotMatch: boolean = false;
  // decoded:any;

  // constructor(
  //   private router: Router,
  //   private service: AuthserviceService) { }

  // loginuser: any
  // login = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(5)])
  // })


  // Signin(login: any) {
  //   console.log('loginnnnn===>>', login)
  //   this.service.logIn(login).subscribe((res: any) => {
  //     console.log('tokenhhhhhhhhhhhhhh', res)
  //     this.loginuser = res;

  //     this.decoded = jwt_decode( this.loginuser?.token)       //error handle by?  
  //     console.log('decodeeeeeeee',this.decoded)

  //     if (res) {
  //       if(this.decoded.status == 'Active'){ 
  //       // alert('Successfully login');
  //       Notiflix.Notify.success("Successfully login")
  //       //localStorage
  //       // localStorage.setItem('logindata', JSON.stringify(this.loginuser));
  //       // localStorage.setItem('token', res.token);
  //       this.login.reset();
  //       this.router.navigate(['dashboard']);
  //     }
  //     else{
  //       // alert("please contact to admin. !!!Invalid Credential")
  //       Notiflix.Notify.warning('please contact to admin. !!!Invalid Credential')
  //     }
  //     }
  //     else {
  //       // this.emailNotMatch = true
  //       alert('user not found')
  //     }
  //   }, error=>{
  //     console.log(error)
  //     if(error.error.msg=='Invalid Password'){
  //       // this.passwordNotMatch = true
  //       Notiflix.Notify.failure('Incorrect Password')
  //     }
  //     else if(error.error.msg=='User Not Found'){
  //       // alert('user not found')
  //       Notiflix.Notify.failure('user not found')
  //     }
  //   })
  // }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  paramValue: any
  authForm!: UntypedFormGroup;
  captchaFormGroup!: UntypedFormGroup;
  // customErrorStateMatcher = new CustomErrorStateMatcher();

  submitted = false;
  loading = false;
  public rememberMe: boolean = false;
  error = "";
  hide = true;
  profileJson: any;
  authentication: any;
  showErrorMessage = false;
  showBlocked = "";
  captcha: any;
  // siteKey = env.captcha.siteKey_v2;
  // @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;
  // @ViewChild('langInput') langInput: ElementRef;

  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  userData: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public router: Router,
    public routerpath: ActivatedRoute,
    private authService: AuthserviceService,
    // private cookieService: CookieService,
    // private loaderService: LoaderService,
    // public dialog: MatDialog,
    // private recaptchaV3Service: ReCaptchaV3Service
  ) {
    // super();
  }


  ngOnInit() {

    this.authForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]],
      password: ["", Validators.required],
      recaptcha: ['', Validators.required]
    });
    // this.getcookiedata();
    this.routerpath.queryParams.subscribe(params => {
      this.paramValue = params['id'];
    });
  }

  onSubmit(): void {
    // this.submitted = true;
    // this.loading = true;
    // this.error = "";
    // if (this.authForm.invalid) {
    //   this.error = "Username and Password not valid !";
    //   return;
    // } else {
    //   if (this.rememberMe == false) {
    //     // this.cookieService.delete("username");
    //     // this.cookieService.delete("password");
    //   } else {
    //     // this.setcookie();
    //   }
    // this.loaderService.initializerLoader("Loading...")
    // this.authentication.client.login(
    //   {
    // realm: "Username-Password-Authentication",
    // username: this.f.username.value.trim().toLowerCase(),
    // password: this.f.password.value.trim(),
    // },
    // (err, authResult) => {
    //   console.log("authResult===>>>", authResult)
    //   if (authResult) {         
    //     const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    //     localStorage.setItem("access_token", authResult.accessToken);
    //     localStorage.setItem("expires_at", expiresAt);
    //     localStorage.setItem("scope", authResult.scope);
    //     localStorage.setItem("isRtl", "false");
    //     this.loading = false;
    //     // this.getProfile();
    //   } else {
    //     // this.loaderService.removeLoader();
    //     this.submitted = false;
    //     this.loading = false;
    //     this.showErrorMessage = true
    //     console.log("ERR", err, "-------", err.description);
    //     this.showBlocked = err.description
    //   }
    // }
    // );
    // }
    console.log('loginnnnn===>>', this.authForm.value)
    this.authService.logIn(this.authForm.value).subscribe((result: any) => {
      console.log('RESULT', result)
      this.userData = jwt_decode(result.token)
      console.log('USER_DATA', this.userData)
        Notiflix.Notify.success(`${this.userData.name} login Successfully!`)
        this.router.navigate(['dashboard/wallboard']);
    }, error => {
      console.log(error)
      if (error.error.msg == 'Invalid Password') {
        // this.passwordNotMatch = true
        Notiflix.Notify.failure('Incorrect Password')
      }
      else if (error.error.msg == 'User Not Found') {
        Notiflix.Notify.failure('User does not Exist')
      }
    })
  }

  // TODO: Store username and pwd in encrypted format
  //  public setcookie(): void {
  //   let user = this.authForm.controls.username.value.trim().toLowerCase();
  //   let password = this.authForm.controls.password.value.trim();

  //   this.cookieService.set("username", user);
  //   this.cookieService.set("password", password);
  // }

  // public getcookiedata() {
  //   let user = this.cookieService.get("username");
  //   let pswd = this.cookieService.get("password");
  //   this.authForm.get("username").setValue(user);
  //   this.authForm.get("password").setValue(pswd);
  //   if (user) {
  //     this.rememberMe = true;
  //   } else {
  //     this.rememberMe = false;
  //   }
  // }

  handleReset() {
    console.log("handleReset")
  }
  handleExpire() {
    console.log("handleExpire")
  }
  handleLoad() {
    console.log("handleLoad")
  }
  handleSuccess(e: any) {
    console.log("handleSuccess")
  }
}
