import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddBookComponent } from '../add-book/add-book.component';
import { Book } from '../models/book';
import { BookServiceService } from '../service/book-service.service';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-admin-display',
  templateUrl: './admin-display.component.html',
  styleUrls: ['./admin-display.component.css']
})
export class AdminDisplayComponent {
  bookDetails:any={
  };
  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private userService:UserServiceService,
    private fb:FormBuilder,
    private bookService:BookServiceService) 
  { 
    this.bookService.getAllBookOfLibrary().subscribe(response=>this.bookDetails=response);
  }
  addBook(){
    const dialogRef = this.dialog.open(AddBookComponent);
    dialogRef.afterClosed().subscribe((result:Book) => {
      console.log('The dialog was closed');
      console.log(result);
      if(result != null || result != undefined) { 
        this.bookService.addBook(result).subscribe({
          next :  (response:any)=>
          {
             this.bookDetails.push(response);
              console.log(response);
            this._snackBar.open("Project Added Successfully", "Done");
          },
          error : (err) => {
              this._snackBar.open("Something went wrong! Please try Again!", "Ok",{
                duration:3000
              });
          }
        }
        )
      }
    });
  }
}
