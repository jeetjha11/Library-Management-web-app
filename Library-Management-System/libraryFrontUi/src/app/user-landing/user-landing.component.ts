import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '../models/book';
import { SearchDialogueByAuthorComponent } from '../search-dialogue-by-author/search-dialogue-by-author.component';
import { SearchDialogueGenreComponent } from '../search-dialogue-genre/search-dialogue-genre.component';
import { SearchDialogueComponent } from '../search-dialogue/search-dialogue.component';
import { BookServiceService } from '../service/book-service.service';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.css']
})
export class UserLandingComponent {

  books: any = {

  };

  constructor(private bookService: BookServiceService, private dialogue: MatDialog, private userService: UserServiceService) {

  }

  value = '';

  ngOnInit(): void {
    this.bookService.getAllBookOfLibrary().subscribe(response => this.books = response
    )
  }
  // bookName:any=
  // {
  // }

  searchByBookName() {
    const dialogueRef = this.dialogue.open(SearchDialogueComponent);

    dialogueRef.afterClosed().subscribe(name => {
      console.log(name)
      if (name != null || name != undefined) {
        this.userService.searchByBookName(name).subscribe({
          next: (response) => {
            this.books = response;
          }
        })
      }




    })

  }
  searchByBookAuthor() {
    const dialougeRef = this.dialogue.open(SearchDialogueByAuthorComponent);

    dialougeRef.afterClosed().subscribe(author => {
      console.log(author);
      
      if (author != null || author != undefined) {
        this.userService.searchBookByAuthor(author).subscribe(
          {
            next: (response) => {
              this.books = response;
            }
          }
        )
      }
    })



  }
  searchByBookGenre() {

    const dialogueRef = this.dialogue.open(SearchDialogueGenreComponent);
    dialogueRef.afterClosed().subscribe(genre => {
      if (genre != null || genre != undefined) {
        this.userService.searchByGenre(genre).subscribe({
          next: (response) => {
            this.books = response;
          }
        })
      }
    })

  }

  issueBookDetails: any =
    {
      bookName: '',
      author: ''

    }

  issueBook(details: Book) {
    console.log(details);
    this.issueBookDetails.name = details.bookName;
    this.issueBookDetails.author = details.author;
    this.userService.issueBook(details).subscribe(
      {
        next: (response) => {
          console.log(response);

        },
        error: (err) => {
          console.log(err);

        }
      }

    )



  }



}
