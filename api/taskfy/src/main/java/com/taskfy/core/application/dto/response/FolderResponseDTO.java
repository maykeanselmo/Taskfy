package com.taskfy.core.application.dto.response;

import com.taskfy.core.domain.tasks.model.Folder;
import com.taskfy.core.domain.users.model.Users;
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
    private Long userId;  // Apenas o ID do usuário
    private Long parentFolderId;  // Apenas o ID da pasta pai (caso exista)
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
