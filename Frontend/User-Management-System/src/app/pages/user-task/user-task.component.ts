import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/Services/task.service';
import { TaskData } from 'src/app/task.model';
import jwt_decode from "jwt-decode";
import { AuthserviceService } from 'src/app/Services/authservice.service';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css']
})
export class UserTaskComponent {

  taskModelObj: TaskData = new TaskData;
  allTaskData: any;

  showAdd!: boolean;
  showUpd!: boolean;
  userData: any
  userShow: boolean = false;
  decode: any;
  userTask: any;
  length: any
  id:any;

  @ViewChild(MatPaginator) //readagain
  paginator!: MatPaginator;

  //pagination
  userlist: any = []
  allUserList: any = []
  data: any[] = [];

  pageSize: number = 5;
  pageIndex: number = 0
  dataSource = new MatTableDataSource<any>();


  constructor(private service: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authservice: AuthserviceService
  ) {

    this.userData = this.authservice.getToken();
    console.log('token==>>', this.userData)
    this.decode = jwt_decode(this.userData)
    console.log("decodedValue======>>>", this.decode);
  }

  
  taskform!: FormGroup; //way to define
  ngOnInit() {
    this.taskform = this.fb.group({
      task_name: ['', [Validators.required, Validators.pattern('[A-Za-z ]*')]],
      employee: ['', [Validators.required, Validators.pattern('[A-Za-z ]*')]],
      assign: ['', [Validators.required]],
      date: ['', [Validators.required]],
      status: ['', [Validators.required]],
      userID: ['', [Validators.required]]
    })

  
    this.userShowFn();
    // this.loadData();
  }

  ngAfterViewInit() {
this.id = this.route.snapshot.queryParamMap.get('id')
console.log('idd=====>>',this.id)

    this.dataSource.paginator = this.paginator;
    this.getTaskByID()
  }


  clickAddTask() {
    this.taskform.reset();
    this.showAdd = true;
    this.showUpd = false;
  }
  addTask() {
    this.taskModelObj.task_name = this.taskform.value.task_name;
    this.taskModelObj.employee = this.taskform.value.employee;
    this.taskModelObj.assign = this.taskform.value.assign;
    this.taskModelObj.date = this.taskform.value.date;
    this.taskModelObj.status = this.taskform.value.status;
    this.taskModelObj.userID = this.taskform.value.userID;



    this.service.addData(this.taskModelObj).subscribe(res => {
      console.log(res);
      // alert("task added successfully")
      Notiflix.Notify.success("task added successfully")
      this.taskform.reset();
      // this.getAllData();
      this.getTaskByID()
    });
  }

  // getAllData() {
  //   const data = {
  //     pageIndex: this.pageIndex,
  //     pageSize: this.pageSize
  //   }
  //   this.service.getTask(data).subscribe(res => {
  //     console.log("prin0000============", res)
  //     this.allTaskData = res.result;
  //     this.length = res.totalData
  //     // this.userTask= this.getAllData
  //   })
  // }


  getTaskByID() {
    console.log('byiddd',this.id)
    this.service.findByUserId(this.id).subscribe(res => {
      console.log("prin0000============", res)
      this.allTaskData = res;
      // this.userTask= this.getAllData
    })
  }


  deleteData(data: any) {
    console.log("kkkkkkkkkkkkkkkkkkkkkkk", data)
    this.service.deleteTask(data._id).subscribe(res => {  //mongodb
      // this.service.deleteTask(data.id).subscribe(res => {
      // alert("Task Deleted");
      Notiflix.Notify.success("Task Deleted")
      this.getTaskByID()
    })
  }

  onEditTask(data: any) {
    this.showAdd = false;
    this.showUpd = true;
    this.taskModelObj.id = data._id //mongodb
    // this.taskModelObj.id = data.id
    this.taskform.controls['task_name'].setValue(data.task_name);
    this.taskform.controls['employee'].setValue(data.employee);
    this.taskform.controls['assign'].setValue(data.assign);
    this.taskform.controls['date'].setValue(data.date);
    this.taskform.controls['status'].setValue(data.status);
    this.taskform.controls['userID'].setValue(data.userID)
  }

  updateTaskData() {
    this.taskModelObj.task_name = this.taskform.value.task_name;
    this.taskModelObj.employee = this.taskform.value.employee;
    this.taskModelObj.assign = this.taskform.value.assign;
    this.taskModelObj.date = this.taskform.value.date;
    this.taskModelObj.status = this.taskform.value.status;
    this.taskModelObj.userID = this.taskform.value.userID;


    this.service.updateTask(this.taskModelObj, this.taskModelObj.id).subscribe(res => {
      // alert('task updated successfully');
      Notiflix.Notify.success("task updated successfully")
      this.taskform.reset();
      this.getTaskByID()
    })
  }

  userShowFn() {
    console.log('decode====>>....', this.decode)
    const status = this.decode.status;
    console.log('statusssssssssss==>.', status)
    const role = this.decode.role
    if (status == 'Active' && role == 'Admin') {
      console.log('active.........')
      this.userShow = true;
    }
  }

  // public handlePage(res: any) {
  //   this.pageIndex = res.pageIndex;
  //   this.pageSize = res.pageSize;
  //   if (this.decode.role == 'Admin') {
  //     this.getAllData();
  //   } else {
  //     console.log('iiiii===', this.decode.id)
  //     this.getTaskByID(this.decode.id);
  //   }
  // }

}

