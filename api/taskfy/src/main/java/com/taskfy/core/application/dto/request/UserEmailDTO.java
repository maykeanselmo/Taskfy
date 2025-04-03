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

public class UserEmailDTO {

    @NotBlank
    @Email(message = "Formato inválido de email")
    @Column(name = "email", nullable = false, unique = true)
    private String email;
}
