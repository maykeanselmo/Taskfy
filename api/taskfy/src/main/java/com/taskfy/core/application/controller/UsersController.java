package com.taskfy.core.application.controller;

import com.taskfy.core.application.dto.request.UserEmailDTO;
import com.taskfy.core.domain.users.model.Users;
import com.taskfy.core.domain.users.service.UsersService;
import com.taskfy.core.application.dto.mapper.UsersMapper;
import com.taskfy.core.application.dto.request.UpdatePasswordDto;
import com.taskfy.core.application.dto.request.UpdateUserDto;
import com.taskfy.core.application.dto.request.UserCreateDto;
import com.taskfy.core.application.dto.response.UpdatePasswordResponse;
import com.taskfy.core.application.dto.response.UserResponseDto;
import jakarta.persistence.EntityNotFoundException;
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
    @GetMapping("/users/email/{email}")
    public ResponseEntity<UserResponseDto> getUserByEmail(@PathVariable("email")String email) {
            Users user = usersService.getUserByEmail(email);
            return ResponseEntity.ok(UsersMapper.toDto(user));

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

    @PutMapping("/users/{id}/password")
    public ResponseEntity<UpdatePasswordResponse> updatePassword(@PathVariable Long id , @Valid @RequestBody UpdatePasswordDto updatedPassword) {
        Users user = usersService.updatePassword(id, updatedPassword);
        UpdatePasswordResponse newPassword = new UpdatePasswordResponse(user.getPassword());
        return ResponseEntity.ok(newPassword);
    }

    @PutMapping("/users/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        Users user = usersService.deleteUser(id);
        return ResponseEntity.ok("Usuário desativado com sucesso");
    }

}
