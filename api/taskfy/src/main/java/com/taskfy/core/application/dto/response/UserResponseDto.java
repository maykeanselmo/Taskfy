package com.taskfy.core.application.dto.response;

import com.taskfy.core.domain.users.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class UserResponseDto {

    private Long  id;
    private String username;
    private String nickname;
    private String email;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserRole role;



    public UserResponseDto(Long id,
                           @NotBlank @Size(min = 3, max = 30, message = "O nome de usuário deve ter entre 3 e 30 caracteres") String username,
                           @NotBlank @Email(message = "Formato inválido de email") String email,
                           boolean active, String string) {

        this.username = username;
        this.email = email;
        this.active = active;


    }
}
