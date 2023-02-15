import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  constructor(private fb:FormBuilder,private _snackBar: MatSnackBar) { 
   }

  bookFormData=this.fb.group({
    bookName : ['',Validators.required],
    author : ['',Validators.required],
    genre :  ['',Validators.required]
  })
  get bookName() { return this.bookFormData.get("bookName")};
  get author() { return this.bookFormData.get("author")};
  get genre() { return this.bookFormData.get("genre")};

  bookData()
  {
    console.log(this.bookFormData.value);
  }
  // uploadBookPic()
  // {

  // }

}
