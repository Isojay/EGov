package cbs.egov.Controller;


import cbs.egov.DTOs.SearchRequest;
import cbs.egov.Entity.DeathRecord;
import cbs.egov.Entity.DeathRecord;
import cbs.egov.Service.DeathRecordService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.fontbox.type1.DamagedFontException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/public/death")
public class DeathRecordController {

    private final DeathRecordService deathRecordService;

    public DeathRecordController(DeathRecordService deathRecordService) {
        this.deathRecordService = deathRecordService;
    }

    @PostMapping("/register")
    public void registerDeath(@RequestBody DeathRecord deathRecord){
        deathRecordService.saveDeathRecord(deathRecord);
    }

    @GetMapping("/fetchAll")
    public List<DeathRecord> fetchAllDeathRecords(){
        return deathRecordService.fetchAllRecords();
    }

    @GetMapping("/verify/{id}")
    public void verify(@PathVariable Long id ){
        deathRecordService.verify(id);
    }

    @PostMapping("/search")
    public DeathRecord fetchRecords(@RequestBody SearchRequest searchRequest) {
        System.out.println(searchRequest.getDate());
        return deathRecordService.fetchRecordsBy(searchRequest);
    }
}
