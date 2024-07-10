package cbs.egov.Repo;

import cbs.egov.Entity.BirthRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface BirthRecordRepository extends JpaRepository<BirthRecord, Long> {

    BirthRecord findByFirstNameAndAndDateOfBirth(String name, Date date);

    List<BirthRecord> findAllByAppliedBy(String email);

}