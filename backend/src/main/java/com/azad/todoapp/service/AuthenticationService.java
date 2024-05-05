package com.azad.todoapp.service;

import com.azad.todoapp.config.JwtService;
import com.azad.todoapp.controller.auth.AuthenticationRequest;
import com.azad.todoapp.controller.auth.AuthenticationResponse;
import com.azad.todoapp.controller.auth.UserInfo;
import com.azad.todoapp.enums.Role;
import com.azad.todoapp.exception.ApiError;
import com.azad.todoapp.model.User;
import com.azad.todoapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(UserInfo request) throws ApiError {
        var exitingUser = userRepository.findByEmail(request.getEmail());
        if (exitingUser.isPresent()) {
            throw new ApiError("User already exist.", HttpStatus.BAD_REQUEST);
        }
        try {
            User user = User.builder()
                    .fullname(request.getFullname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(Role.USER)
                    .build();
            userRepository.save(user);
            String jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        } catch (Exception e) {
            throw new ApiError("Something went wrong in registration.", HttpStatus.BAD_REQUEST);
        }
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = userRepository.findByEmail((request.getEmail())).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
