package com.azad.todoapp.controller.auth;


import com.azad.todoapp.exception.ApiError;
import com.azad.todoapp.service.AuthenticationService;
import com.azad.todoapp.utils.CustomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<CustomResponse<AuthenticationResponse>> register(@RequestBody UserInfo request) throws ApiError {
        return ResponseEntity.ok(CustomResponse.getSuccess(authService.register(request)));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<CustomResponse<AuthenticationResponse>> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(CustomResponse.getSuccess(authService.authenticate(request)));
    }
}
