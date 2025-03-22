package com.taskfy.core.application.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UpdateUserDto {
    @NotBlank
    @Column(name = "username", nullable = false, unique = true)
    @Size(min = 3, max = 30, message = "O nome de usuário deve ter entre 3 e 30 caracteres")
    private String username;

    @Column(name = "nickname", nullable = true)
    private String nickname;

    @NotBlank
    @Email(message = "Formato inválido de email")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "active", nullable = false)
    private boolean active;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
