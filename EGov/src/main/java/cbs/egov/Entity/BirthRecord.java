package cbs.egov.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BirthRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String birthPlace;
    private String fatherName;
    private String motherName;
    private String gender;
    private String registeredBy;
    private Date registrationDate = new Date();

    private String appliedBy;

    private Boolean status;

}