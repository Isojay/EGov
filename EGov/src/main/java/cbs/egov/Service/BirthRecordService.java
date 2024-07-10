package cbs.egov.Service;

import cbs.egov.Entity.BirthRecord;
import cbs.egov.Entity.DeathRecord;
import cbs.egov.Repo.BirthRecordRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BirthRecordService {

    private final BirthRecordRepository birthRecordRepository;

    public BirthRecordService(BirthRecordRepository birthRecordRepository) {
        this.birthRecordRepository = birthRecordRepository;
    }

    public void saveBirthRecord(BirthRecord birthRecord){
        birthRecord.setStatus(false);
        birthRecord.setRegisteredBy("Ram Bahadur");
        birthRecordRepository.save(birthRecord);
    }

    public void verify(Long id){
        Optional<BirthRecord> deathRecord = birthRecordRepository.findById(id);
        if (deathRecord.isPresent()){
            BirthRecord record =  deathRecord.get();
            record.setStatus(true);
            birthRecordRepository.save(record);
        }
    }

    public List<BirthRecord> fetchAllRecords(){
        return birthRecordRepository.findAll();
    }

}
