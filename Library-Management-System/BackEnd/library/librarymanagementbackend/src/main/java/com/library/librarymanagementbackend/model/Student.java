package com.library.librarymanagementbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Student {
    @Id
    private String studentId;
    private String name,email,phone,password;
    private Binary profilePic;
    private List<IssuedBookDetails> bookDetails;

}
