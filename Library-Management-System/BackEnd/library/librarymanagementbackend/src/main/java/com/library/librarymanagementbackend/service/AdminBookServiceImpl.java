package com.library.librarymanagementbackend.service;

import com.library.librarymanagementbackend.exception.DocumentAlreadyExistException;
import com.library.librarymanagementbackend.exception.DocumentNotFoundException;
import com.library.librarymanagementbackend.model.BookDetails;
import com.library.librarymanagementbackend.model.IssueBook;
import com.library.librarymanagementbackend.repos.BookRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class AdminBookServiceImpl implements AdminBookService {

    @Autowired
    private BookRepository bookRepository;


    @Override
    public List<BookDetails> addBook(BookDetails bookDetails) throws DocumentAlreadyExistException {

        String id=new ObjectId().toString();
        bookDetails.setBookId(id);
        System.out.println(id);

//        System.out.println(arrayList);
        boolean flag=false;


           Optional<BookDetails> bookDetails1= Optional.ofNullable(bookRepository.findByBookNameAndAuthor(bookDetails.getBookName(), bookDetails.getAuthor()));
           System.out.println(bookDetails1);
           if (bookDetails1.isEmpty())
           {
               bookDetails.setBookImage(null);
               bookRepository.insert(bookDetails);
               return bookRepository.findAll();
           }
           throw new DocumentAlreadyExistException();
       }


    @Override
    public List<BookDetails> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public BookDetails updateBookDetails(BookDetails bookDetails) throws DocumentNotFoundException {

        try
        {
//            BookDetails bookDetails1=bookRepository.findByBookNameAndAuthor(bookDetails.getBookName(), bookDetails.getAuthor());
            BookDetails bookDetails1=bookRepository.findById(bookDetails.getBookId()).get();
            if (bookDetails1!=null)
            {
                Binary tempPicData=bookDetails1.getBookImage();
                BookDetails bookDetails2=new BookDetails(bookDetails.getBookId(),
                        bookDetails.getBookName(), bookDetails.getAuthor(), bookDetails.getGenre(),tempPicData);
                return bookRepository.save(bookDetails2);
            }
            return null;
        }
        catch (Exception e)
        {
            throw new DocumentNotFoundException();
        }
    }

    @Override
    public boolean deleteBookDetails(String bookId) throws DocumentNotFoundException {
        try
        {
            Optional<BookDetails> bookDetails1=bookRepository.findById(bookId);
            if(bookDetails1.isPresent()){
                BookDetails bookDetails=bookDetails1.get();
                bookRepository.deleteById(bookDetails.getBookId());
                return true;
            }
//            System.out.println(bookDetails1.getBookId());
//            bookDetails.setBookId(bookDetails1.getBookId());
//            System.out.println(bookDetails.getBookId());
//            if (bookRepository.findById(bookDetails.getBookId()).isPresent())
//            {
//                bookRepository.deleteById(bookDetails.getBookId());
//                return true;
//            }
            return false;
        }
        catch (Exception e)
        {
            throw new DocumentNotFoundException();
        }
    }

    @Override
    public List<BookDetails> findByName(String name) throws DocumentNotFoundException {

        try
        {
            List<BookDetails>bookDetails=   bookRepository.findByBookName(name);
            if (bookDetails.size()>0)
            {
                return bookDetails;
            }
           throw new DocumentNotFoundException();
        }
        catch (Exception e)
        {
            throw new DocumentNotFoundException();
        }
    }

    @Override
    public List<BookDetails> findByAuthor(String author) throws DocumentNotFoundException {
        try
        {
            List<BookDetails>bookDetails= bookRepository.findByAuthor(author);
            if (bookDetails.size()>0)
            {
                return bookDetails;
            }
            throw new DocumentNotFoundException();
        }
        catch (Exception e)
        {
            throw new DocumentNotFoundException();
        }

    }

    @Override
    public List<BookDetails> findByGenre(String genre) throws DocumentNotFoundException {

        try
        {
            List<BookDetails>bookDetails= bookRepository.findByGenre(genre);
            if (bookDetails.size()>0)
            {
                return bookDetails;
            }
           throw new DocumentNotFoundException();
        }
        catch (Exception e)
        {
            throw new DocumentNotFoundException();
        }
    }

    @Override
    public BookDetails uploadBookPic(MultipartFile multipartFile, String bookId) throws DocumentNotFoundException, IOException {
        Optional<BookDetails> bookDetails=bookRepository.findById(bookId);
        if (bookDetails.isPresent())
        {
            BookDetails tempBook=bookDetails.get();
            tempBook.setBookImage(new Binary(BsonBinarySubType.BINARY,multipartFile.getBytes()));
            return bookRepository.save(tempBook);
        }
        else
        {
            throw new DocumentNotFoundException();
        }
    }
}
