package com.taskfy.core.application.dto.request;

import com.taskfy.core.domain.users.enums.UserRole;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;


@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor

public class UserCreateDto {

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

    @NotBlank
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "active", nullable = false)
    private boolean active;
    private UserRole role;

}
