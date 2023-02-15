package com.library.librarymanagementbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document
public class BookDetails {
    @Id
    private String bookId;
    private String bookName;
    private String author;
    private String genre;
    private Binary bookImage;
}
