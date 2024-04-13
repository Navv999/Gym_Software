import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { AuthserviceService } from 'src/app/Services/authservice.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  updateButtonhide: Boolean = false;
  myForm: FormGroup;
  errorMsg: any;

  constructor(private formBuilder: FormBuilder, private auth_service: AuthserviceService, private route: Router, private datePipe: DatePipe) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      package: ['', Validators.required]
    });
  }
  selectedOptions = new FormControl([]);

  // onRoleChange(role: string) {
  //   const selectedRole = this.roles.find(r => r.role === role);
  //   if (selectedRole) {
  //     // Set start date to today's date
  //     const startDate = new Date();
  //     this.myForm.patchValue({ startDate: startDate.toISOString().split('T')[0] });
  //     // Calculate end date based on the selected role's days
  //     const endDate = new Date(startDate);
  //     endDate.setDate(endDate.getDate() + selectedRole.days);
  //     this.myForm.patchValue({ endDate: endDate.toISOString().split('T')[0] });
  //   }
  // }

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

  public onSubmit() {
    if (this.myForm.valid) {
      console.log("ADDUSER_RESPONSE_BODY", this.myForm.value, this.myForm.value.startDate, this.myForm.value.endDate)
      this.auth_service.addUsers(this.myForm.value).subscribe((res: any) => {
        console.log("ADDUSER_RESPONSE", res)
        Notiflix.Notify.success("User Created Successfully")
        this.route.navigate(['/dashboard/users'])
      }, ((err: any) => {
        console.log("ERROR_MSG", err)
        if (err.error || err.error.error) {
          this.errorMsg = err.error.msg
          Notiflix.Notify.warning(this.errorMsg)
        }
      }))
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


  phoneNumber:any;
  
  onPhoneChange(phoneNumber:any) {
    // Handle phone number changes here
    console.log('Phone number changed:', phoneNumber);
  }
}
