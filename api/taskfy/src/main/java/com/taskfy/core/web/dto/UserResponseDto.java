package com.taskfy.core.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserResponseDto {

    private String username;
    private String email;
    private String password;
    private boolean active;
}
