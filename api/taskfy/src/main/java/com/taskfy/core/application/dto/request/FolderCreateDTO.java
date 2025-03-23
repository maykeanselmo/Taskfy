package com.taskfy.core.application.dto.request;

import com.taskfy.core.domain.tasks.model.Folder;
import com.taskfy.core.domain.users.model.Users;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FolderCreateDTO {

    @NotNull(message = "User ID cannot be null")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "parent_id", nullable = true)
    private Folder parentFolder;

    @NotBlank(message = "Folder name cannot be empty")
    @Size(max = 255, message = "Folder name cannot be longer than 255 characters")
    @Column(name = "name", nullable = false)
    private String name;

}
