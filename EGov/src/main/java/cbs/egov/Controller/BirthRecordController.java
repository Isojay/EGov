package cbs.egov.Controller;

import cbs.egov.Config.JwtService;
import cbs.egov.Entity.BirthRecord;
import cbs.egov.Service.BirthRecordService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/birth")
public class BirthRecordController {

    private final BirthRecordService birthRecordService;

    private final JwtService jwtService;

    public BirthRecordController(BirthRecordService birthRecordService, JwtService jwtService) {
        this.birthRecordService = birthRecordService;
        this.jwtService = jwtService;
    }

    @GetMapping("/verify/{id}")
    public void verify(@PathVariable Long id ){
        birthRecordService.verify(id);
    }

    @PostMapping("/register")
    public void registerBirth(@RequestBody BirthRecord birthRecord,HttpServletRequest request){

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        String userEmail = "isongum1@gmail.com";
        if(authHeader != null || authHeader.startsWith("Bearer ")){
            jwt = authHeader.substring(7);
            userEmail = jwtService.extractUsername(jwt);
        }
        birthRecord.setAppliedBy(userEmail);

        birthRecordService.saveBirthRecord(birthRecord);
    }

    @GetMapping("/fetchAll")
    public List<BirthRecord> fetchAllBirthRecords(){
        return birthRecordService.fetchAllRecords();
    }

}
