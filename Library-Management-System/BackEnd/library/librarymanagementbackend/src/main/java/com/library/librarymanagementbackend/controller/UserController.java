package com.library.librarymanagementbackend.controller;

import com.library.librarymanagementbackend.exception.DocumentAlreadyExistException;
import com.library.librarymanagementbackend.exception.DocumentNotFoundException;
import com.library.librarymanagementbackend.model.IssueBook;
import com.library.librarymanagementbackend.model.Student;
import com.library.librarymanagementbackend.model.UserRegistrationData;
import com.library.librarymanagementbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegistrationData userRegistrationData) throws DocumentAlreadyExistException {
        Student student=userService.registerStudent(userRegistrationData);
        if (student!=null)
        {
            return new ResponseEntity<>(student, HttpStatus.OK);
        }
        return new ResponseEntity<>("Try after sometime",HttpStatus.ALREADY_REPORTED);
    }

    @GetMapping("/auth/getDetails")
    public ResponseEntity<?> getUserDetails(HttpServletRequest httpServletRequest) throws DocumentNotFoundException {
        String id=(String)httpServletRequest.getAttribute("current_userId");
        if (id!=null)
        {
            return new ResponseEntity<>(userService.getStudentDetail(id),HttpStatus.OK);
        }
        return new ResponseEntity<>("User Not Exist",HttpStatus.NOT_FOUND);
    }

    @PutMapping("/auth/editDetails")
    public ResponseEntity<?> editDetails(@RequestBody Student student, HttpServletRequest httpServletRequest) throws DocumentNotFoundException {

        String id=(String)httpServletRequest.getAttribute("current_userId");
        if (id.equals(student.getStudentId()))
        {
            Student student1=userService.editStudentDetail(student,id);
            return new ResponseEntity<>(student1,HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>("Student Not Found",HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/auth/delete")
    public ResponseEntity<?> deleteUser(HttpServletRequest httpServletRequest) throws DocumentNotFoundException {
        String id=(String)httpServletRequest.getAttribute("current_userId");
        if (id!=null)
        {
            userService.deleteStudentDetail(id);
            return new ResponseEntity<>(true,HttpStatus.OK);
        }
        return new ResponseEntity<>(false,HttpStatus.NOT_FOUND);
    }

    @PostMapping("/auth/issueBook")
    public ResponseEntity<?> issueBook(@RequestBody IssueBook book, HttpServletRequest httpServletRequest) throws DocumentNotFoundException, DocumentAlreadyExistException {
        String id=(String)httpServletRequest.getAttribute("current_userId");
        if (id!=null)
        {
            Student student=userService.issueBook(book,id);
            if (student!=null)
            {
                return new ResponseEntity<>(student,HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("Try After Sometime",HttpStatus.BAD_REQUEST);
    }

    @PatchMapping("/auth/submitBook")
    public ResponseEntity<?> submitBook(@RequestBody IssueBook book,HttpServletRequest httpServletRequest) throws DocumentNotFoundException {
        String id=(String)httpServletRequest.getAttribute("current_userId");
        System.out.println(id);
        if (id!=null)
        {
            Student student=userService.submitBook(book,id);

                return new ResponseEntity<>(student,HttpStatus.OK);

        }
        return new ResponseEntity<>("Try After sometime",HttpStatus.NOT_FOUND);
    }

    @GetMapping("/auth/issuedBook")
    public ResponseEntity<?> issuedBook(HttpServletRequest httpServletRequest) throws DocumentNotFoundException {
        String id=(String)httpServletRequest.getAttribute("current_userId");
        if (id!=null)
        {
            return new ResponseEntity<>(userService.issuedBook(id),HttpStatus.OK);
        }
        return new ResponseEntity<>("Not Found",HttpStatus.NOT_FOUND);
    }

    @PostMapping("/auth/upload-profile-pic")
    public ResponseEntity<?> addPic(@RequestBody MultipartFile multipartFile, HttpServletRequest httpServletRequest) throws DocumentNotFoundException, IOException {
        String id=(String)httpServletRequest.getAttribute("current_userId");
//        System.out.println(multipartFile.getOriginalFilename());
        System.out.println("hii");
        if (id!=null)
        {
            return new ResponseEntity<>(userService.uploadBookPic(multipartFile,id),HttpStatus.OK);
        }
        return new ResponseEntity<>("You are not a authorize user",HttpStatus.BAD_REQUEST);

    }

}
