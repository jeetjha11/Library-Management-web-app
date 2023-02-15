import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-dialogue',
  templateUrl: './search-dialogue.component.html',
  styleUrls: ['./search-dialogue.component.css']
})
export class SearchDialogueComponent {

  constructor(private fb:FormBuilder,private _snakebar:MatSnackBar)
  {}


  bookData=this.fb.group(
    {
      bookName:['',Validators.required]
    }
  )

  get bookName()
  {
    return this.bookData.get("bookName");
  } 

  bookDataValue()
  {

  }

}
