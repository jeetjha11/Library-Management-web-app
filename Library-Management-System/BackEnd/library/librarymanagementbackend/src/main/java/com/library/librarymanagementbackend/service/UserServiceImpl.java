package com.library.librarymanagementbackend.service;

import com.library.librarymanagementbackend.exception.DocumentAlreadyExistException;
import com.library.librarymanagementbackend.exception.DocumentNotFoundException;
import com.library.librarymanagementbackend.model.*;
import com.library.librarymanagementbackend.proxy.UserDataProxy;
import com.library.librarymanagementbackend.repos.BookRepository;
import com.library.librarymanagementbackend.repos.UserRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserDataProxy userDataProxy;

    @Override
    public Student registerStudent(UserRegistrationData student) throws DocumentAlreadyExistException {

        String id=new ObjectId().toString();
        UserDTO userDTO=new UserDTO(id, student.getEmail(), student.getPassword(),"Role_User");
        ArrayList<IssuedBookDetails>arrayList=new ArrayList<>();
        try
        {
            ResponseEntity<?> response=userDataProxy.sendDataToUserDto(userDTO);
            if (response.getStatusCode()== HttpStatus.OK)
            {
                Student student1=new Student(id,student.getName(),
                        student.getEmail(),student.getPhone(),student.getPassword(),null,arrayList);
                Student student2=userRepository.insert(student1);
                return student2;
            }
            return null;
        }
        catch (Exception e)
        {
            if (e.getMessage().toString().substring(1,4).equals("409"))
            {
                throw new DocumentAlreadyExistException();
            }
            throw e;
        }


    }

    @Override
    public Student getStudentDetail(String id) throws DocumentNotFoundException {
        Optional<Student> student=userRepository.findById(id);
        if (student!=null)
        {
            return userRepository.findById(id).get();
        }
        return null;
    }

    @Override
    public Student editStudentDetail(Student student, String id) throws DocumentNotFoundException {
        try
        {
            System.out.println("hitting");
            UserDTO userDTO=new UserDTO(id,student.getEmail(),student.getPassword(),"Role_User");
            ResponseEntity<?>response=userDataProxy.editUserDataInAuthApp(userDTO);
            if (response.getStatusCode()==HttpStatus.OK)
            {
                System.out.println("hitting 1");
                ArrayList<IssuedBookDetails>arrayList=new ArrayList<>();
                Student student3=userRepository.findById(id).get();

               arrayList.add((IssuedBookDetails) student3.getBookDetails());
                System.out.println("hitting 2");
               Binary profilePic=student3.getProfilePic();
                Student student1=new Student(id, student.getName(), student.getEmail(), student.getPhone(),
                        student.getPassword(), profilePic,arrayList);
                System.out.println(student1);

                Student student2=userRepository.save(student1);
                System.out.println("hitting 3");
                return student2;
            }
            return null;
        }
        catch (Exception e)
        {
            throw new DocumentNotFoundException();
        }

    }

    @Override
    public boolean deleteStudentDetail(String id) throws DocumentNotFoundException {
        try
        {
            ResponseEntity<?>response=userDataProxy.deleteUser(id);
            if (response.getStatusCode()==HttpStatus.OK)
            {
                userRepository.deleteById(id);
                return true;
            }
            return false;
        }
        catch (Exception e)
        {
            throw new DocumentNotFoundException();
        }
    }

    @Override
    public Student issueBook(IssueBook issueBook, String id) throws DocumentNotFoundException, DocumentAlreadyExistException {
        Optional<Student> student=userRepository.findById(id);
        if (student.isPresent())
        {
            BookDetails bookDetails=bookRepository.findByBookNameAndAuthor(issueBook.getBookName(),issueBook.getAuthor());
            ArrayList<IssuedBookDetails>arrayList= (ArrayList<IssuedBookDetails>) student.get().getBookDetails();
            boolean flag=false;
            for (IssuedBookDetails issuedBookDetail:arrayList)
            {
                if (issuedBookDetail.getBookId().equals(bookDetails.getBookId()))
                {
                    flag=true;
                }
            }

            System.out.println(arrayList);
            Date date=new Date();
            Calendar calendar=Calendar.getInstance();
            calendar.setTime(date);
            System.out.println(calendar.getTime());
            calendar.add(Calendar.DAY_OF_MONTH,8);
            Date submissionDate=calendar.getTime();
            System.out.println(submissionDate);
            System.out.println(bookDetails);
            if (!flag)
            {
                IssuedBookDetails issuedBookDetails=new IssuedBookDetails(bookDetails.getBookId(), bookDetails.getBookName(),
                        bookDetails.getGenre(), bookDetails.getAuthor(), date,submissionDate);
                Student temp=student.get();
                temp.getBookDetails().add(issuedBookDetails);


                Student student1=userRepository.save(temp);
                return student1;
            }
            throw new DocumentAlreadyExistException();

        }
        throw new DocumentNotFoundException();

    }

    @Override
    public Student submitBook(IssueBook book, String userId) throws DocumentNotFoundException {
        Optional<Student>student=userRepository.findById(userId);
        BookDetails bookDetails=bookRepository.findByBookNameAndAuthor(book.getBookName(),book.getAuthor());
        try
        {
            if (student.isPresent()) {
                System.out.println("inside student");
                ArrayList<IssuedBookDetails> arrayList = (ArrayList<IssuedBookDetails>) student.get().getBookDetails();
                System.out.println(arrayList);
                boolean flag = false;
                for (IssuedBookDetails issuedBookDetail : arrayList) {
                    if (issuedBookDetail.getBookId().equals(bookDetails.getBookId())) {
                        Student temp = student.get();
                        temp.getBookDetails().remove(issuedBookDetail);
                        Student student1 = userRepository.save(temp);
                        return student1;
                    }
                }
            }
           throw new DocumentNotFoundException();
        }
        catch (Exception e)
        {
            throw new DocumentNotFoundException();
        }
    }

    @Override
    public List<IssuedBookDetails> issuedBook(String userId) throws DocumentNotFoundException {
        Optional<Student> student=userRepository.findById(userId);
        if (student.isPresent())
        {
            return student.get().getBookDetails();
        }
        throw new DocumentNotFoundException();
    }

    @Override
    public Student uploadBookPic(MultipartFile multipartFile, String studentId) throws IOException, DocumentNotFoundException {
        Optional<Student> student=userRepository.findById(studentId);
        if (student.isPresent())
        {
            Student tempStudent=student.get();
            tempStudent.setProfilePic(new Binary(BsonBinarySubType.BINARY,multipartFile.getBytes()));
            return userRepository.save(tempStudent);
        }
        else
        {
            throw new DocumentNotFoundException();
        }
    }


}
