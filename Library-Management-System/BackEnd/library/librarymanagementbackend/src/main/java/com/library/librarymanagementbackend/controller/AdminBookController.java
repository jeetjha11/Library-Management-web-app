package com.library.librarymanagementbackend.controller;

import com.library.librarymanagementbackend.exception.DocumentAlreadyExistException;
import com.library.librarymanagementbackend.exception.DocumentNotFoundException;
import com.library.librarymanagementbackend.model.*;
import com.library.librarymanagementbackend.service.AdminBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class AdminBookController {
    @Autowired
    private AdminBookService adminBookService;


    @PostMapping("/auth/addBook")
    public ResponseEntity<?> addBook(@RequestBody BookDetails bookDetails,HttpServletRequest httpServletRequest) throws DocumentAlreadyExistException {
//
          String role=(String) httpServletRequest.getAttribute("current_user_role");
          if (role.equals("Role_Admin"))
          {
              return new ResponseEntity<>(adminBookService.addBook(bookDetails), HttpStatus.OK);
          }
          return new ResponseEntity<>("You Are Not a Authorize User",HttpStatus.BAD_REQUEST);

    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllBooks()
    {
        return new ResponseEntity<>(adminBookService.getAllBooks(),HttpStatus.OK);
    }

    @PutMapping("/auth/updateBook")
    public ResponseEntity<?> updateBook(@RequestBody BookDetails bookDetails,HttpServletRequest httpServletRequest) throws DocumentNotFoundException {
        String role=(String) httpServletRequest.getAttribute("current_user_role");
        System.out.println(role);
        System.out.println(bookDetails);
        if (role.equals("Role_Admin"))
        {
            BookDetails bookDetails1=adminBookService.updateBookDetails(bookDetails);
            System.out.println(bookDetails1);
            return new ResponseEntity<>(bookDetails1,HttpStatus.OK);

        }
        return new ResponseEntity<>("Something Went wrong",HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/auth/deleteBook/{bookId}")
    public ResponseEntity<?> deleteBook(@PathVariable String bookId,HttpServletRequest httpServletRequest) throws DocumentNotFoundException {
        String role=(String) httpServletRequest.getAttribute("current_user_role");
        if (role.equals("Role_Admin"))
        {
            return new ResponseEntity<>(adminBookService.deleteBookDetails(bookId),HttpStatus.OK);
        }
        return new ResponseEntity<>("You are Not a Authorize User",HttpStatus.NOT_FOUND);
    }


    @PostMapping("/findByName")
    public ResponseEntity<?>findByBookName(@RequestBody BookName bookName) throws DocumentNotFoundException {
        return new ResponseEntity<>(adminBookService.findByName(bookName.getBookName()),HttpStatus.OK);
    }

    @PostMapping("/findByAuthor")
    public ResponseEntity<?>findByBookByAuthorName(@RequestBody BookAuthor bookAuthor) throws DocumentNotFoundException {
        return new ResponseEntity<>(adminBookService.findByAuthor(bookAuthor.getAuthor()),HttpStatus.OK);
    }

    @PostMapping("/findByGenre")
    public ResponseEntity<?>findByBookByGenre(@RequestBody BookGenre bookGenre) throws DocumentNotFoundException {
        return new ResponseEntity<>(adminBookService.findByGenre(bookGenre.getGenre()),HttpStatus.OK);
    }

    @PostMapping("/auth/uploadPic/{bookId}")
    public ResponseEntity<?> addPic(@RequestBody MultipartFile multipartFile,@PathVariable String bookId, HttpServletRequest httpServletRequest) throws DocumentNotFoundException, IOException {
        String role=(String)httpServletRequest.getAttribute("current_user_role");
//        System.out.println(multipartFile.getOriginalFilename());
        System.out.println("hii");
        if (role.equals("Role_Admin"))
        {
            return new ResponseEntity<>(adminBookService.uploadBookPic(multipartFile,bookId),HttpStatus.OK);
        }
        return new ResponseEntity<>("You are not a authorize user",HttpStatus.BAD_REQUEST);

    }



}
