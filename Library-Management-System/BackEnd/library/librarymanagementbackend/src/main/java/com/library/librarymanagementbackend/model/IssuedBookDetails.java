package com.library.librarymanagementbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IssuedBookDetails {
    private String bookId,bookName,BookGenre ,bookAuthor;
            private Date IssuedDate,SubmissionDate;


}
