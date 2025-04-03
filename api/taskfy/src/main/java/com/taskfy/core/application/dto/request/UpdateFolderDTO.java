package com.taskfy.core.application.dto.request;

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
public class UpdateFolderDTO {

    @Size(min = 1, max = 255, message = "O nome da pasta não pode ser vazio ou muito grande.")
    private String name;

    private Long parentFolderId;
}
