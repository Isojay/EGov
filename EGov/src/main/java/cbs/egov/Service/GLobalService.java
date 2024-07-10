package cbs.egov.Service;

import cbs.egov.Entity.BirthRecord;
import cbs.egov.Entity.DeathRecord;
import cbs.egov.Repo.BirthRecordRepository;
import cbs.egov.Repo.DeathRecordRepository;
import org.springframework.boot.context.properties.bind.BindableRuntimeHintsRegistrar;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class GLobalService {

    private final BirthRecordRepository birthRecordRepository;
    private final DeathRecordRepository deathRecordRepository;

    public GLobalService(BirthRecordRepository birthRecordRepository, DeathRecordRepository deathRecordRepository) {
        this.birthRecordRepository = birthRecordRepository;
        this.deathRecordRepository = deathRecordRepository;
    }

    public HashMap<String,Object> fetchAll(String email){

        HashMap<String,Object> data = new HashMap<>();
        List<BirthRecord> birthRecords = birthRecordRepository.findAllByAppliedBy(email);
        List<DeathRecord> deathRecords = deathRecordRepository.findAllByAppliedBy(email);

        if (!birthRecords.isEmpty()){
            data.put("birth",birthRecords);
        }
        if (!deathRecords.isEmpty()){
            data.put("death",deathRecords);
        }
        return data;
    }
}
