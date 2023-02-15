import { Component } from '@angular/core';
import { IssueBookModel } from '../models/issueBook';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-issued-book',
  templateUrl: './issued-book.component.html',
  styleUrls: ['./issued-book.component.css']
})
export class IssuedBookComponent {

  books:any;
  isLoggedIn:any;
  constructor(private userService:UserServiceService)
  { 
    this.userService.isLoggedIn.subscribe(response=>this.isLoggedIn=response)
  }

  bookData:any=
  {
    bookName:'',
    author:''

  }

  ngOnInit()
  {
    this.userService.viewIssuedBook().subscribe(
      {
        next:
        (response:any)=>
        {
          console.log(response);
          
          this.books=response;
          console.log(this.books);
          
        }
      }
    )
  }


  submitBook(data:any)
  {
    this.bookData.bookName=data.bookName;
    this.bookData.author=data.bookAuthor;
    console.log(this.bookData);
    
    
    console.log(data);

    this.userService.submitBook(this.bookData).subscribe(
      {
        next:(response)=>
        {
          console.log("Done");
          this.userService.viewIssuedBook().subscribe(
            response=>{
              this.books=response;
            }
          )
          
        },
        error:(err:any)=>
        {
          console.log(err);
          
        }
      }
    )
    
    
  }


}
