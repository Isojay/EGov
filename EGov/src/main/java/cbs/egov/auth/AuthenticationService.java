package cbs.egov.auth;



import cbs.egov.Config.JwtService;
import cbs.egov.Entity.User.Role;
import cbs.egov.Entity.User.User;
import cbs.egov.Repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepo userRepo;
    private  final JwtService jwtService;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public User registerAdmin(RegisterRequest request) {
        var user = User.builder()
                .uname(request.getName())
                .uemail(request.getEmail())
                .upassword(passwordEncoder.encode(request.getPassword()))
                .role(Role.ADMIN)
                .build();
        return userRepo.save(user);
    }

    public User registerUser(RegisterRequest request) {

        Optional<User> userExits = userRepo.findByUemail(request.getEmail());
        if(userExits.isPresent()){
            throw new IllegalArgumentException("Email Already Registered");
        }

        var user = User.builder()
                .uname(request.getName())
                .uemail(request.getEmail())
                .upassword(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .active(true)
                .build();

        return userRepo.save(user);
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request) {

        Optional<User> userExits = userRepo.findByUemail(request.getEmail());

        if(userExits.isPresent()){
            if (!userExits.get().getActive()) {
                throw new IllegalArgumentException("User Not Active");
            }
        };

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepo.findByUemail(request.getEmail()).orElseThrow(RuntimeException::new);
        var jwtToken = jwtService.generateToken(user);
        var role = user.getRole();
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(role.name())
                .build();
    }
}
