import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search-dialogue-genre',
  templateUrl: './search-dialogue-genre.component.html',
  styleUrls: ['./search-dialogue-genre.component.css']
})
export class SearchDialogueGenreComponent {

  constructor(private fb:FormBuilder,private _snakebar:MatSnackBar)
  {}

  bookData=this.fb.group(
    {
      genre:['',Validators.required]
    }
  )

  get genre()
  {
    return this.bookData.get("genre");
  } 

  bookDataValue()
  {

  }
}
