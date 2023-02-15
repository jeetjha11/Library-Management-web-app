import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-dialogue-by-author',
  templateUrl: './search-dialogue-by-author.component.html',
  styleUrls: ['./search-dialogue-by-author.component.css']
})
export class SearchDialogueByAuthorComponent {

  constructor(private fb:FormBuilder,private _snakebar:MatSnackBar)
  {}


  bookData=this.fb.group(
    {
      author:['',Validators.required]
    }
  )

  get author()
  {
    return this.bookData.get("author");
  } 

  bookDataValue()
  {

  }

}
