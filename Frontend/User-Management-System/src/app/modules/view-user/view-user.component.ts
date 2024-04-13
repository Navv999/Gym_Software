import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { AuthserviceService } from 'src/app/Services/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  updateButtonhide: Boolean = false;
  myForm!: FormGroup;
  errorMsg: any;
  userID:any
  endDate: any;
  constructor(private formBuilder: FormBuilder, private auth_service: AuthserviceService, private route: Router, private router: ActivatedRoute, private datePipe: DatePipe) {
     this.userID = this.router.snapshot.queryParams['userId'];
    console.log("USER_ID_QUERYPARAM",this.userID);
     }

  ngOnInit(){
    this.getUserByUserID();
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      startDate: [{ value:'', disabled:true }, Validators.required],
      endDate: [{ value:'', disabled:true }, Validators.required],
      package: [{ value:'', disabled:true }, Validators.required],
      daysLeft: [{ value:'', disabled:true }, Validators.required]

    });
  }

    
  getUserByUserID() {
    this.auth_service.getUserByUserId(this.userID).subscribe((res: any) => {
      console.log("GETUSERBYID_RES", res.data[0],res.data[0].packages);
      // this.endDate = res.data[0].map((item: any) => {
        // console.log("item", item.endDate);
        const today = new Date(res.data[0].startDate); // Get current date
        const end = new Date(res.data[0].endDate);
        const difference = end.getTime() - today.getTime();
        const daysLeft = Math.ceil(difference / (1000 * 3600 * 24));
        console.log("TODAY",daysLeft)
        res.data[0].daysLeft = daysLeft;
      // });
      this.myForm.patchValue({
        name: res.data[0].name,
        email: res.data[0].email,
        contact: res.data[0].contact,
        address: res.data[0].address,
        startDate: res.data[0].startDate,
        daysLeft: daysLeft,
        package: res.data[0].packages[0]
      });
    });
  }  

  public onRoleChange(role: string) {
    const selectedRole = this.roles.find(r => r.role === role);
    if (selectedRole) {
      // Set start date to today's date
      const startDate = new Date();
      const startDateFormatted = this.datePipe.transform(startDate, 'yyyy-MM-dd');
      this.myForm.patchValue({ startDate: startDateFormatted });
      console.log('Start Date:', startDate, startDateFormatted);
      // Calculate end date based on the selected role's months
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + selectedRole.months);
      console.log('End Date:', endDate);
      // Adjust the end date if the number of months exceeds 12
      if (endDate.getMonth() === 0) {
        endDate.setFullYear(endDate.getFullYear() - 1);
        endDate.setMonth(11);
      }
      this.myForm.patchValue({ endDate: this.datePipe.transform(endDate, 'yyyy-MM-dd') });
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Form submitted successfully!', this.myForm.value);
      // Add your logic to handle the form submission
    } else {
      // If the form is invalid, mark all fields as touched to display validation errors
      this.myForm.markAllAsTouched();
    }
  }

  roles = [
    { role: 'platinum', display: 'Platinum', months: 12 }, // 365 days divided by 30 days per month ≈ 12 months
    { role: 'diamond', display: 'Diamond', months: 6 },   // 180 days divided by 30 days per month ≈ 6 months
    { role: 'gold', display: 'Gold', months: 3 },         // 90 days divided by 30 days per month ≈ 3 months
    { role: 'silver', display: 'Silver', months: 1 }      // 30 days divided by 30 days per month = 1 month
    // Add more roles as needed
  ];

  public updteButtonEnable(event: any) {
    if (event) {
      this.updateButtonhide = true;
    }
    else {
      this.updateButtonhide = false;
    }
  }
}
