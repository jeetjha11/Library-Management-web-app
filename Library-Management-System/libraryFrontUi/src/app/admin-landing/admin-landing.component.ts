import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddBookComponent } from '../add-book/add-book.component';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { Book } from '../models/book';
import { BookServiceService } from '../service/book-service.service';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent {
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

  ngOnInit():void {}
  // const dialogRef = this.dialog.open(AddBookComponent);
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });

  
  book:any;
  bookPicForm = this.fb.group({
    bookImage: ['']
  });

  get bookImage(){ return this.bookPicForm.get('bookImage')};

  uploadBookImage(event:any,bookId:string):void {
    const formData = new FormData();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.bookImage?.setValue(file);
    }
    
    formData.append('multipartFile', this.bookPicForm.get('bookImage')?.value ?? '');
    this.bookService.uploadBookPic(formData,bookId).subscribe({
      next: data => {
        console.log(data);
        this.bookDetails = data;
      }
    })
  }

  editBookDetails(details: Book) {
    const dialogRef = this.dialog.open(EditBookComponent, {
      data: details
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('The dialog was closed');
      console.log(res);
      let editedBook:Book=res;
      this.bookService.editBook(editedBook).subscribe({
        next: (data:any) => {
          console.log(data);
          this.bookDetails.forEach((book:Book, index:number) => {
            if(book.bookId == data.projectId) {
              this.bookDetails[index] = data;
            }
          })
          this._snackBar.open("Project edited", "success", {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        },
        error : (err) => {
          this._snackBar.open("Something went wrong! Please try again!", "OK", {
            duration:3000
          });
        }
      })
    })
  }

  deleteBook(bookId:string){
    console.log(bookId);
    this.bookService.deleteBook(bookId).subscribe({
      next :  (response:any)=>
      {
        this._snackBar.open("Book Deleted Successfully", "Done");
      },
      error : (err) => {
          this._snackBar.open("Something went wrong! Please try Again!", "Ok",{
            duration:3000
          });
      }
    })
  }
}
