package cbs.egov.Service;

import cbs.egov.DTOs.SearchRequest;
import cbs.egov.Entity.DeathRecord;
import cbs.egov.Repo.DeathRecordRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DeathRecordService {

    private final DeathRecordRepository deathRecordRepository;

    public DeathRecordService(DeathRecordRepository deathRecordRepository) {
        this.deathRecordRepository = deathRecordRepository;
    }

    public void saveDeathRecord(DeathRecord deathRecord){
        deathRecord.setStatus(false);
        deathRecord.setRegisteredBy("Ram Bahadur");
        deathRecordRepository.save(deathRecord);
    }

    public void verify(Long id){
        Optional<DeathRecord> deathRecord = deathRecordRepository.findById(id);
        if (deathRecord.isPresent()){
            DeathRecord record =  deathRecord.get();
            record.setStatus(true);
            deathRecordRepository.save(record);
        }
    }

    public List<DeathRecord> fetchAllRecords(){
        return deathRecordRepository.findAll();
    }

    public DeathRecord fetchRecordsBy(SearchRequest request){
        return deathRecordRepository.findByDeceasedNameAndAndDateOfDeath(request.getName(), request.getDate());

    }

}