package com.taskfy.core.web.controller;



import com.taskfy.core.domain.users.model.Users;
import com.taskfy.core.domain.users.repository.UsersRepository;
import com.taskfy.core.infra.security.TokenService;
import com.taskfy.core.web.dto.AuthenticationDto;
import com.taskfy.core.web.dto.LoginResponseDto;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
@AllArgsConstructor

public class AuthenticationController {

   final private AuthenticationManager authenticationManager;

   final  private UsersRepository repository;

   final  private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid AuthenticationDto data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.getEmail(), data.getPassword());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Users) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDto(token));
    }

}

