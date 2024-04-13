import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/Services/authservice.service';

@Component({
  selector: 'app-wallboard',
  templateUrl: './wallboard.component.html',
  styleUrls: ['./wallboard.component.css']
})
export class WallboardComponent {
  timeInterval:any;
  currentDay:any;
  totaUserCount: any;
  totalPlatinumUsers: any;
  totalDiamondUsers: any;
  totalGoldUsers: any;
  totalSilverUsers: any;

  constructor(
    private auth_service: AuthserviceService,
    private router: Router,) { }

 ngOnInit() {
    this.getLiveDateTime();
    this.getAllCount();
 }

 public getLiveDateTime() {
  this.timeInterval = setInterval(() => {
    this.currentDay = new Date()
  }, 1000);
}

public getAllCount(){
  this.auth_service.getAllCount().subscribe((result:any)=>{
    console.log("TOTAL_COUNT",result)
    this.totaUserCount = result.data.totalUsers
    this.totalPlatinumUsers = result.data.totalPlatinumUsers
    this.totalDiamondUsers = result.data.totalDiamondUsers
    this.totalGoldUsers = result.data.totalGoldUsers
    this.totalSilverUsers = result.data.totalSilverUsers

  })
}

}
