package com.taskfy.core.application.dto.request;

import jakarta.persistence.Column;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TagCreateDto {

    @Size(max = 100, message = "Folder name cannot be longer than 100 characters")
    @Column(name = "name", nullable = false)
    private String name;
}
