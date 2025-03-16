package com.taskfy.core.web.controller;

import com.taskfy.core.domain.users.model.Users;
import com.taskfy.core.domain.users.service.UsersService;
import com.taskfy.core.web.dto.UpdatePasswordDto;
import com.taskfy.core.web.dto.UpdateUserDto;
import com.taskfy.core.web.dto.UserCreateDto;
import com.taskfy.core.web.dto.UserResponseDto;
import com.taskfy.core.web.dto.mapper.UsersMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1")
public class UsersController {
    private final UsersService usersService;

    @PostMapping("/users")
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody UserCreateDto dto){
        Users user = usersService.createUser(UsersMapper.toUser(dto));
        log.info("Usuario criado com sucesso");
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(UsersMapper.toDto(user));
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable("id") Long id) {
        Users user = usersService.getUserById(id);
        log.info("Usuario encontrado com sucesso");

        UserResponseDto userResponseDto = UsersMapper.toDto(user);
        return ResponseEntity.ok(userResponseDto);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long id, @Valid @RequestBody UpdateUserDto dto) {

        Users userUpdated = usersService.updateUser(id, dto);
        log.info("Usuario atualizado com sucesso");
        return ResponseEntity.ok(UsersMapper.toDto(userUpdated));
    }

    @GetMapping("/users")
    public ResponseEntity<Page<UserResponseDto>> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        Page<Users> usersPage = (Page<Users>) usersService.getAllUsersPaginated(page, size, sortBy, direction);
        return ResponseEntity.ok(usersPage.map(UsersMapper::toDto));
    }

}
