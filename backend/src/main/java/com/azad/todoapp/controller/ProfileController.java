package com.azad.todoapp.controller;

import com.azad.todoapp.controller.auth.UserInfo;
import com.azad.todoapp.model.User;
import com.azad.todoapp.utils.CustomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {
    @GetMapping("/me")
    public ResponseEntity<CustomResponse<UserInfo>> getCurrentUser() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserInfo userInfo = UserInfo.builder()
                .fullname(user.getFullname())
                .email(user.getEmail())
                .build();
        return ResponseEntity.ok(CustomResponse.getSuccess(userInfo));
    }
}
