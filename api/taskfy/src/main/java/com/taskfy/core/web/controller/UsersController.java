package com.taskfy.core.web.controller;

import com.taskfy.core.domain.users.model.Users;
import com.taskfy.core.domain.users.service.UsersService;
import com.taskfy.core.web.dto.UserCreateDto;
import com.taskfy.core.web.dto.UserResponseDto;
import com.taskfy.core.web.dto.mapper.UsersMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1")
public class UsersController {
    private final UsersService usersService;

    @PostMapping("/users")
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody UserCreateDto dto){
        Users user = usersService.createUser(UsersMapper.toUser(dto));
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(UsersMapper.toDto(user));
    }

}
