import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  baseUrl:string="http://localhost:9999/api/auth";
  getAllBookUrl:string="http://localhost:9999/api/getAll"
  authToken:string='';
  constructor(private http:HttpClient,private userService:UserServiceService) {
    this.userService.authToken.subscribe(data=>this.authToken=data);
   }


  getAllBookOfLibrary()
  {
    return this.http.get(this.getAllBookUrl);
  }
  addBook(bookDetails:Book)
  {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken  
    })
    let requestOptions = { headers: httpHeaders }
    return this.http.post(this.baseUrl + "/addBook", bookDetails, requestOptions);
  }
  editBook(bookDetails:Book)
  {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken  
    })
    let requestOptions = { headers: httpHeaders }
    return this.http.put(this.baseUrl + "/updateBook", bookDetails, requestOptions);
  }
  deleteBook(bookId:string)
  {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken  
    })
    let requestOptions = { headers: httpHeaders }
    return this.http.delete(`${this.baseUrl}/deleteBook/${bookId}`,requestOptions);
  }
  uploadBookPic(bookPic:any,bookId:string): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authToken
    })
    return this.http.post(`${this.baseUrl}/uploadPic/${bookId}`,bookPic, {
      headers : httpHeaders
    })
  }


}
