import { Component,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from '../models/book';
import { BookServiceService } from '../service/book-service.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent {
  constructor(private fb:FormBuilder,private _snackBar: MatSnackBar,
    private bookService: BookServiceService,@Inject(MAT_DIALOG_DATA) public book:Book) {
   }

  editbookFormData=this.fb.group({
   bookId :[''],
   bookName : ['',Validators.required],
   author : ['',Validators.required],
   genre :  ['',Validators.required]
 })
 get bookId() { return this.editbookFormData.get("bookId")};
 get bookName() { return this.editbookFormData.get("bookName")};
 get author() { return this.editbookFormData.get("author")};
 get genre() { return this.editbookFormData.get("genre")};

 bookData()
 {
   console.log(this.editbookFormData.value);
 }
 ngOnInit() {
  console.log(this.book);
  this.bookId?.setValue(this.book?.bookId ?? '');
  this.bookName?.setValue(this.book?.bookName ?? '');
  this.author?.setValue(this.book?.author ?? '');
  this.genre?.setValue(this.book?.genre ?? '');
}
}
