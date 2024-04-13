import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthserviceService } from 'src/app/Services/authservice.service';
import * as Notiflix from 'notiflix';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  verify: any;
  token: any;
  decode: any;

  constructor(
    private service: AuthserviceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token')
    console.log('verification.......', this.token)
    this.decode = jwtDecode(this.token)
    console.log('decodetoken', this.decode)
  }

  emailVerify() {
    this.service.emailVerify(this.decode).subscribe((res) => {
      this.verify = res;
      console.log('ressssssss===>>>', this.verify)
      // alert('Email is Verified')
      Notiflix.Notify.success('Email is Verified')
    }, (error: any) => {
      console.log(error)
      if (error.error.msg == 'something went wrong') {
        // alert('Something went wrong')
        Notiflix.Notify.failure('Something went wrong')
      }
      else if (error.error.msg == 'Email already Verified') {
        // alert('Email not Found')
        Notiflix.Notify.failure('Email already Verified')
      }
      else if (error.error.msg == 'Email not Found') {
        // alert('Email not Found')
        Notiflix.Notify.failure('Email not Found')

      }
    })
  }
}
