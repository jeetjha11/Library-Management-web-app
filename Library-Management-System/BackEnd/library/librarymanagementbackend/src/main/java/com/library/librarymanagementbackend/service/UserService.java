package com.library.librarymanagementbackend.service;

import com.library.librarymanagementbackend.exception.DocumentAlreadyExistException;
import com.library.librarymanagementbackend.exception.DocumentNotFoundException;
import com.library.librarymanagementbackend.model.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
    Student registerStudent(UserRegistrationData userRegistrationData) throws DocumentAlreadyExistException;
    Student getStudentDetail(String id) throws DocumentNotFoundException;
    Student editStudentDetail(Student student,String id) throws DocumentNotFoundException;
    boolean deleteStudentDetail(String id) throws DocumentNotFoundException;
    Student issueBook(IssueBook issueBook, String id) throws DocumentNotFoundException,DocumentAlreadyExistException;
    Student submitBook(IssueBook issueBook,String userId) throws DocumentNotFoundException;
    List<IssuedBookDetails> issuedBook(String userId) throws DocumentNotFoundException;
    Student uploadBookPic(MultipartFile multipartFile, String studentId) throws IOException,DocumentNotFoundException;
}
