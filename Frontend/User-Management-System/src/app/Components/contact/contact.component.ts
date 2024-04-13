import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthserviceService } from 'src/app/Services/authservice.service';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  adminShow: boolean = false;
  data: any
  decode: any;
  allUserData: any;
  ActiveUserData: any;
  InActiveUserData: any;
  allTaskData: any;
  pendingTaskData: any;
  completeTaskData: any;

  constructor(
    private service: AuthserviceService,
    private taskService: TaskService,
    private router: Router) {
    this.data = this.service.getToken();
    this.decode = jwtDecode(this.data)
  }

  ngOnInit(): void {
    this.adminShowPage();
    this.userList();
    this.taskList();
  }



  adminShowPage() {
    const status = this.decode.status
    const role = this.decode.role
    if (status == 'Active' && role == 'Admin') {
      this.adminShow = true
    }
  }

  activeUser() {
    this.router.navigate(['/dashboard/user'], { queryParams: { status: 'Active' } });
  }

  InactiveUser() {
    // const data = {
    //     status: 'Active'
    // }
    this.router.navigate(['/dashboard/user'], { queryParams: { status: 'In Active' } });
  }

  completeTask() {
    this.router.navigate(['/dashboard/task'], { queryParams: { status: 'Completed' } });
  }

  incompleteTask() {
    this.router.navigate(['/dashboard/task'], { queryParams: { status: 'Pending' } });
  }

  userList() {
    this.service.allCountData().subscribe((res: any) => {
      // console.log("RRRRRRR", res)
      this.allUserData = res.totalData
      this.ActiveUserData = res.ActiveData
      this.InActiveUserData = res.InActiveData
    })
  }


  taskList() {
    if (this.decode.role == 'User') {
      console.log('dataaaaadecode', this.decode)
      const data = {
        id: this.decode.id
      }
      this.taskService.TaskCountById(data).subscribe((res: any) => {
        console.log("RRRRRRR", res)
        this.allTaskData = res.totalTask

        this.completeTaskData = res.completeTask
        this.pendingTaskData = res.pendingTask
      })
    }
    else {
      this.taskService.allTaskCount().subscribe((res: any) => {
        console.log("RRRRRRR", res)
        this.allTaskData = res.totalTask

        this.completeTaskData = res.completeTask
        this.pendingTaskData = res.pendingTask
      })
    }
  }
}



