import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http:HttpClient) {
}
  
  api_url = "http://localhost:4000"

  signUp(data:any){
    // console.log('ser..==>>',email)
      return this.http.post<any>(`${this.api_url}/auth/signup/`,data)
  }

  logIn(data:any){
    console.log("DATA_SERVICE",data)
    return this.http.post<any>(`${this.api_url}/user/signin`,data).pipe(map((res:any)=>{
      console.log('LOCALSTORAGE_RES',res)
     localStorage.setItem('token',res.token)
     return res;
    }))
  }

  update(data:any){
    return this.http.patch<any>(`${this.api_url}/auth/update/${data.id}`,data)
  }
  
  updateUsers(data: any, id: any) {
    console.log('service.........====>',data,id)
    return this.http.put<any>(`${this.api_url}/auth/modify/${id}`, data).pipe(map((res: any) => {
      return res;
    }))
  }

  findById(id:any){
    return this.http.get<any>(`${this.api_url}/auth/getId?id=${id}`)
  }

  // checkEmail(email: any) {
  //   console.log("emaillllll===>",email)
  //   return this.http.get<any>(`${this.api_url}/auth/checkEmail/${email}`)
  // }

  getToken(){
   return localStorage.getItem('token')
  }

  isLogOut(){
    return localStorage.removeItem('token')
  }

  //Users For Gym
  addUsers(data:any){
    return this.http.post<any>(`${this.api_url}/user/addUser`,data)
  }

  getUser(data:any){
    return this.http.post<any>(`${this.api_url}/user/fetch`,data)
  }

  deleteUser(user_id:any){
    return this.http.delete<any>(`${this.api_url}/user/delete/${user_id}`)
  }

  getUserByUserId(user_id:any){
    return this.http.get<any>(`${this.api_url}/user/filter/${user_id}`)
  }

  getAllCount(){
    return this.http.get<any>(`${this.api_url}/user/count`).pipe(map((res: any) => {
      return res;
    }))
  }

  emailVerify(data:any){
     return this.http.patch<any>(`${this.api_url}/auth/verify`,data);
  }

  allCountData(){
    return this.http.get<any>(`${this.api_url}/auth/allUserCount`).pipe(map((res: any) => {
      return res;
    }))
  }
}
