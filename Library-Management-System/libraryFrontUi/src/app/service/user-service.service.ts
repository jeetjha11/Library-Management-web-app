import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IssueBookModel } from '../models/issueBook';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  isLoggedIn = new BehaviorSubject<boolean>((localStorage.getItem('isLoggedIn') == "true") ?? false);
  authToken = new BehaviorSubject<string>(localStorage.getItem("jwt") ?? '');
  userRole=new BehaviorSubject<string>(localStorage.getItem("role") ?? '');
  
  appUrl:string = "http://localhost:9999/api"
  loginBaseUrl:string="http://localhost:9999/authentication/login"
  baseUrl:string = "http://localhost:9999/api/auth"
  searchUrl:string = "http://localhost:9999/api"

  constructor(private http:HttpClient) { }

  registerUser(registerData:User){
    return this.http.post(`${this.appUrl}/register`,registerData);
  }
  
  loginUser(logindata:User){
    return this.http.post(this.loginBaseUrl,logindata);
  }

  logout():void {
    this.isLoggedIn.next(false);
    localStorage.clear();
  }
  

  issueBook(bookData: IssueBookModel)  //start
  {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken.value
    })
    let requestOptions = { headers: httpHeaders }
    return this.http.post(`${this.baseUrl}/issueBook`,bookData,requestOptions)
  }

  submitBook(bookData:IssueBookModel)
  {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken.value
    })
    let requestOptions = { headers: httpHeaders }
    return this.http.patch(`${this.baseUrl}/submitBook`,bookData,requestOptions)
  }

  viewIssuedBook()
  {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken.value
    })
    let requestOptions = { headers: httpHeaders }
    return this.http.get(`${this.baseUrl}/issuedBook`,requestOptions)
  }

  searchByBookName(name:any)
  {  
    return this.http.post(this.appUrl+"/findByName",name)
  }

  searchBookByAuthor(author:any)
  {
    return this.http.post(`${this.appUrl}/findByAuthor`,author)
  }
  searchByGenre(genre:any)
  {
    return this.http.post(`${this.appUrl}/findByGenre`,genre)
  }


  uploadProfilePic(profilePic:any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken.value
    })
    let requestOptions = { headers: httpHeaders }
    return this.http.post(`${this.baseUrl}/upload-profile-pic`,profilePic,requestOptions)
  }

  updateProfile(userData:any)
  {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken.value
    })
    let requestOptions = { headers: httpHeaders }
    return this.http.put(`${this.baseUrl}/editDetails`,userData,requestOptions)
  }

  viewProfileOfUser()
  {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken.value
    })
    let requestOptions = { headers: httpHeaders }
    return this.http.get(`${this.baseUrl}/getDetails`,requestOptions)
  }


}
