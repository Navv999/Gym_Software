import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  api_url = 'http://localhost:4000'
  constructor(private http: HttpClient) {
    // this.url="http://localhost:3000/task"
  }

  addData(data: any) {
    return this.http.post<any>(`${this.api_url}/task/create`, data).pipe(map((res: any) => {
      return res;
    }))
  }

  getTask(data:any) {
    console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVV",data)
    return this.http.get<any>(`${this.api_url}/task/task-list?pageSize=${data.pageSize}&skip=${data.pageIndex}`).pipe(map((res: any) => {
      return res;
    }))
  }

  filterTask(status:any){
    return this.http.get<any>(`${this.api_url}/task/filter?status=${status}`)
  }

  updateTask(data: any, id: any) {
    return this.http.put<any>(`${this.api_url}/task/update/${id}`, data).pipe(map((res: any) => {
      return res;
    }))
  }

  deleteTask(id: any) {
    console.log("iiiii=====>", id)
    return this.http.delete<any>(`${this.api_url}/task/delete/${id}`).pipe(map((res: any) => {
      return res;
    }))
  }

  findByUserId(id: any) {
    console.log('nameeeeee',id)
    return this.http.get<any>(`${this.api_url}/task/findbytask/${id}`).pipe(map((res: any) => {
      console.log('ress',res)
      return res;
    }))
  }

  // findByuserID(id: any) {
  //   console.log('nameeeeee',id)
  //   return this.http.get<any>(`${this.api_url}/task/findbyID/?id=${id}`).pipe(map((res: any) => {
  //     console.log('ress',res)
  //     return res;
  //   }))
  // }


  TaskCountById(data:any){
    return this.http.get<any>(`${this.api_url}/task/UserTaskById?id=${data.id}`).pipe(map((res: any) => {
      return res;
    }))
  }

  allTaskCount(){
    return this.http.get<any>(`${this.api_url}/task/allUserTask`).pipe(map((res: any) => {
      return res;
    }))
  }



  // paginatedData(currentPage: any, pageSize: any, skip: any) {
  //   console.log("pag====>>>", currentPage, pageSize, skip)
  //   return this.http.get<any>(`${this.api_url}/items?page=${currentPage}&pageSize=${pageSize}&skip=${skip}`).pipe(map((res: any) => {
  //     console.log('res=====',res)
  //     return res;
  //   }))
  // }
}
