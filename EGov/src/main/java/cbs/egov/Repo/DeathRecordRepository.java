package cbs.egov.Repo;

import cbs.egov.Entity.BirthRecord;
import cbs.egov.Entity.DeathRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface DeathRecordRepository extends JpaRepository<DeathRecord, Long> {

    DeathRecord findByDeceasedNameAndAndDateOfDeath(String name, Date date);

    List<DeathRecord> findAllByAppliedBy(String email);

}
