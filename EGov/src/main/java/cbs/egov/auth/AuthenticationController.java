package cbs.egov.auth;


import cbs.egov.DTOs.ResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class AuthenticationController {

    private  final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request){
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO.setMessage("Registration Successful.");
            responseDTO.setStatusCode(HttpStatus.OK.getReasonPhrase());
            responseDTO.setDetails(service.registerUser(request));
            return new ResponseEntity<>(responseDTO, HttpStatus.OK);
        }
         catch (IllegalArgumentException e){
            responseDTO.setMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.BAD_REQUEST.getReasonPhrase());
             return new ResponseEntity<>(responseDTO,HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            responseDTO.setMessage("Log In Successful");
            responseDTO.setStatusCode(HttpStatus.OK.getReasonPhrase());
            responseDTO.setDetails(service.authenticate(request));
            return new ResponseEntity<>(responseDTO,HttpStatus.OK);
        } catch (IllegalArgumentException e){
            responseDTO.setMessage(e.getMessage());
            responseDTO.setStatusCode(HttpStatus.UNAUTHORIZED.getReasonPhrase());
            return new ResponseEntity<>(responseDTO,HttpStatus.UNAUTHORIZED);
        }
        catch (BadCredentialsException e) {
            responseDTO.setMessage("Invalid Email or Password");
            responseDTO.setStatusCode(HttpStatus.UNAUTHORIZED.getReasonPhrase());
            return new ResponseEntity<>(responseDTO,HttpStatus.UNAUTHORIZED);
        }
    }


}
