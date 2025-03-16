package com.taskfy.core.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdatePasswordResponse {
    private String currentPassword;
}
