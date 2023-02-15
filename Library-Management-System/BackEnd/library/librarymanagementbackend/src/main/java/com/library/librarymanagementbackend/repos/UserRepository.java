package com.library.librarymanagementbackend.repos;


import com.library.librarymanagementbackend.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
;
import org.springframework.stereotype.Repository;



@Repository
public interface UserRepository extends MongoRepository<Student,String> {


}
