package cbs.egov.Controller;

import cbs.egov.Config.JwtService;
import cbs.egov.DTOs.ResponseDTO;
import cbs.egov.Service.GLobalService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("")
public class DemoController {

    private final JwtService jwtService;
    private final GLobalService gLobalService;

    public DemoController(JwtService jwtService, GLobalService gLobalService) {
        this.jwtService = jwtService;
        this.gLobalService = gLobalService;
    }

    @GetMapping("/public")
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("Hello From the Public Endpoint");
    }

    @GetMapping("/auth/user")
    public ResponseEntity<String> sayOLA(){
        return ResponseEntity.ok("Hello From User Secured ENdpoint");
    }
    @GetMapping("/auth/admin")
    public ResponseEntity<String> sayHallo(){
        return ResponseEntity.ok("Hallo From Admin Secured ENdpoint");
    }

    @GetMapping("/auth/user/fetchAll")
    public ResponseEntity<?> get(HttpServletRequest request){
        ResponseDTO responseDTO = new ResponseDTO();

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            responseDTO.setMessage("NO Bearer Token");
            responseDTO.setStatusCode(HttpStatus.FORBIDDEN.getReasonPhrase());
            return new ResponseEntity<>(responseDTO,HttpStatus.FORBIDDEN);
        }
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwt);
        responseDTO.setMessage("Registration Successful.");
        responseDTO.setStatusCode(HttpStatus.OK.getReasonPhrase());
        System.out.println(gLobalService.fetchAll(userEmail));
        responseDTO.setDetails(gLobalService.fetchAll(userEmail));
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

}
