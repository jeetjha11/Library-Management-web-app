package com.library.librarymanagementbackend.service;

import com.library.librarymanagementbackend.exception.DocumentAlreadyExistException;
import com.library.librarymanagementbackend.exception.DocumentNotFoundException;
import com.library.librarymanagementbackend.model.BookDetails;
import com.library.librarymanagementbackend.model.IssueBook;
import org.bson.types.Binary;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AdminBookService  {
    List<BookDetails> addBook(BookDetails bookDetails) throws DocumentAlreadyExistException;
    List<BookDetails> getAllBooks();
    BookDetails updateBookDetails(BookDetails bookDetails) throws DocumentNotFoundException;
    boolean deleteBookDetails(String bookId) throws DocumentNotFoundException;
    List<BookDetails> findByName(String name) throws DocumentNotFoundException;
    List<BookDetails> findByAuthor(String author)throws DocumentNotFoundException;
    List<BookDetails> findByGenre(String genre) throws DocumentNotFoundException;

    BookDetails uploadBookPic(MultipartFile multipartFile, String bookId) throws IOException,DocumentNotFoundException;
}
