import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { AuthserviceService } from 'src/app/Services/authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  decode: any;
  userData: any;
  adminShow: boolean = false

  constructor(
    private router: Router,
    private service: AuthserviceService) {

    this.userData = this.service.getToken();
    console.log('hhhhhhhhhhhhhhhhhhhhhh', this.userData)
    // this.userData = JSON.parse(this.userData)
    this.decode = jwt_decode(this.userData)
    console.log("ngngng=====>>>", this.decode);
  }

  //userupdatepart
  // ngOnChanges(changes: SimpleChanges): void { }
  // ngAfterViewInit(): void {}


  ngOnInit() {
    this.adminShowFn();
  }

  //logout
  logout() {
    // localStorage.removeItem('logindata');
    // localStorage.removeItem('token')
    this.service.isLogOut();
    this.router.navigate(['signin'])
  }

  //profile
  NavigateToProfile() {
    console.log("ggggggggggggg", this.userData)
    const data = {
      // id: this.userData._id
      id: this.decode.id
    }
    this.router.navigate(['/dashboard/profile', data]);
  }


  adminShowFn() {
    console.log('decode====>>....', this.decode)
    const status = this.decode.status;
    console.log('statusssssssssss==>.', status)
    const role = this.decode.role
    if (status == 'Active' && role == 'Admin') {
      console.log('active.........')
      this.adminShow = true;
    }
  }

  userFnc(){
    this.router.navigate(['/dashboard/user']);
  }

}
