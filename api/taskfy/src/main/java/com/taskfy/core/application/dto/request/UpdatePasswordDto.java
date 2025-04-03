package com.taskfy.core.application.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdatePasswordDto {
    private String currentPassword;
    private String newPassword;
}
