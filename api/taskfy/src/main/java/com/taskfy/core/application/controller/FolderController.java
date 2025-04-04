package com.taskfy.core.application.controller;

import com.taskfy.core.application.dto.mapper.FolderMapper;
import com.taskfy.core.application.dto.request.FolderCreateDTO;
import com.taskfy.core.application.dto.request.UpdateFolderDTO;
import com.taskfy.core.application.dto.response.FolderResponseDTO;
import com.taskfy.core.domain.tasks.model.Folder;
import com.taskfy.core.domain.tasks.service.FolderService;
import com.taskfy.core.domain.users.model.Users;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/folders")
public class FolderController {

    private final FolderService folderService;

    @PostMapping()
    public ResponseEntity<FolderResponseDTO> createFolder(@Valid @RequestBody FolderCreateDTO folderCreateDTO,
                                                          @AuthenticationPrincipal Users authenticatedUser) {
        // Garantir que a pasta criada seja associada ao usuário autenticado
        Folder createdFolder = folderService.createFolder(folderCreateDTO, authenticatedUser.getId());
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(FolderMapper.toDto(createdFolder));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FolderResponseDTO> getFolderById(@PathVariable("id") Long id,
                                                           @AuthenticationPrincipal Users authenticatedUser) {
        // Verificando se o usuário autenticado tem permissão para acessar a pasta
        Folder folder = folderService.getFolderByID(id, authenticatedUser.getId());
        return ResponseEntity.ok(FolderMapper.toDto(folder));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFolder(@PathVariable("id") Long id,
                                             @AuthenticationPrincipal Users authenticatedUser) {
        // Verificando se o usuário autenticado tem permissão para excluir a pasta
        folderService.deleteFolder(id, authenticatedUser.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FolderResponseDTO>> getFoldersByUser(@PathVariable Long userId,
                                                                    @AuthenticationPrincipal Users authenticatedUser) {
        // Verificando se o 'userId' corresponde ao usuário autenticado
        if (!userId.equals(authenticatedUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Ou lançar uma exceção
        }
        List<Folder> folders = folderService.getFoldersByUserId(userId, authenticatedUser.getId());
        List<FolderResponseDTO> response = folders.stream()
                .map(FolderMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}/root")
    public ResponseEntity<List<FolderResponseDTO>> getRootFoldersByUser(@PathVariable Long userId,
                                                                        @AuthenticationPrincipal Users authenticatedUser) {
        // Verificando se o 'userId' corresponde ao usuário autenticado
        if (!userId.equals(authenticatedUser.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Ou lançar uma exceção
        }
        List<Folder> rootFolders = folderService.getRootFoldersByUserId(authenticatedUser.getId(), userId);
        List<FolderResponseDTO> response = rootFolders.stream()
                .map(FolderMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}/subfolders")
    public ResponseEntity<List<FolderResponseDTO>> getSubFolders(@PathVariable("id") Long id,
                                                                 @AuthenticationPrincipal Users authenticatedUser) {
        // Verificando se o usuário autenticado tem permissão para acessar as subpastas
        List<Folder> subFolders = folderService.getSubFoldersByFolderId(id, authenticatedUser.getId());
        List<FolderResponseDTO> response = subFolders.stream()
                .map(FolderMapper::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FolderResponseDTO> updateFolder(@PathVariable Long id,
                                                          @Valid @RequestBody UpdateFolderDTO updateFolderDTO,
                                                          @AuthenticationPrincipal Users authenticatedUser) {
        // Verificando se o usuário autenticado tem permissão para atualizar a pasta
        Folder updatedFolder = folderService.updateFolder(updateFolderDTO, id, authenticatedUser.getId());
        FolderResponseDTO response = FolderMapper.toDto(updatedFolder);
        return ResponseEntity.ok(response);
    }
}
