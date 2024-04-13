import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/Services/authservice.service';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {

  constructor(private service:AuthserviceService,
     private router:Router,
     private route:ActivatedRoute){}


  editData: any;

  ngAfterViewInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log('kkkkkkkk====id',id)
    if (id) {
      this.service.findById(id).subscribe((res: any) => {
        this.editData = res;
        console.log("jjjjjjjj===>>", this.editData, res)
        if (res) {
          this.signup.patchValue({
            fname: this.editData[0].fname,
            lname: this.editData[0].lname,
            email: this.editData[0].email,
            password: this.editData[0].password
          })
        }
      })
    }
  }

  ngOnInit(): void {
  }

  
  signup = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z ]*')]),
    lname: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z ]*')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required,Validators.minLength(5)])
  })
 
  updation(data: any) {
    console.log("ppppp====", data)
    if (this.editData) {
      // data['id'] = this.editData._id
      data['id'] = this.editData[0].id
      console.log('this.edit',this.editData)
      this.service.update(data).subscribe({
        next: (res: any) => {
          console.log("rrrrrrrrrrrr===>>",res),
          // confirm('updated successfully')
          Notiflix.Notify.success('updated successfully')
          this.router.navigate(['dashboard'])
        },
        error: (err: any) => { console.log(err) }

      })
    }
  }

}