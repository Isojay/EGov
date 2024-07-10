package cbs.egov.Service;

import cbs.egov.Entity.BirthRecord;
import cbs.egov.Repo.BirthRecordRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<BirthRecord> fetchAllRecords(){
        return birthRecordRepository.findAll();
    }

}
