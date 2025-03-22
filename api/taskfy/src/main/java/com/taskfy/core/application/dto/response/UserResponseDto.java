package com.taskfy.core.application.dto.response;

import com.taskfy.core.domain.users.enums.UserRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class UserResponseDto {

    private String username;
    private String nickname;
    private String email;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserRole role;
}
