package com.taskfy.core.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdatePasswordResponse {
    private String currentPassword;
}
