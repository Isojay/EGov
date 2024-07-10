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
public class DeathRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String deceasedName;
    private Date dateOfDeath;
    private String placeOfDeath;
    private String causeOfDeath;
    private String registeredBy;
    private Date registrationDate = new Date();

    private String appliedBy;

    private Boolean status;

}