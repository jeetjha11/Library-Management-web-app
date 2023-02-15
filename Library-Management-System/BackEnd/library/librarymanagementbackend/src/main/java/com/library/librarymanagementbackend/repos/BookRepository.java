package com.library.librarymanagementbackend.repos;

import com.library.librarymanagementbackend.model.BookDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends MongoRepository<BookDetails,String> {

    List<BookDetails> findByBookName(String name);
    List<BookDetails>findByAuthor(String author);
    List<BookDetails>findByGenre(String genre);


    BookDetails findByBookNameAndAuthor(String name,String author);
}
