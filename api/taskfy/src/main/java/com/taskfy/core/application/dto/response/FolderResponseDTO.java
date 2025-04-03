package com.taskfy.core.application.dto.response;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FolderResponseDTO {


    private Long id;

    private String name;
    private Long userId;
    private Long parentFolderId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
