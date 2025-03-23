package com.taskfy.core.application.controller;

import com.taskfy.core.application.dto.mapper.FolderMapper;
import com.taskfy.core.application.dto.request.FolderCreateDTO;
import com.taskfy.core.application.dto.request.UpdateFolderDTO;
import com.taskfy.core.application.dto.response.FolderResponseDTO;
import com.taskfy.core.domain.tasks.model.Folder;
import com.taskfy.core.domain.tasks.service.FolderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<FolderResponseDTO> createFolder(@Valid @RequestBody FolderCreateDTO folderCreateDTO) {
        Folder createdFolder = folderService.createFolder(folderCreateDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(FolderMapper.toDto(createdFolder));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FolderResponseDTO> getFolderById(@PathVariable("id") Long id) {
        Folder createdFolder = folderService.getFolderByID(id);
        return ResponseEntity.ok(FolderMapper.toDto(createdFolder));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFolder(@PathVariable("id") Long id) {
            folderService.deleteFolder(id);
            return ResponseEntity.noContent().build();

    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FolderResponseDTO>> getFoldersByUser(@PathVariable Long userId) {
        List<Folder> folders = folderService.getFoldersByUserId(userId);
        List<FolderResponseDTO> response = folders.stream()
                .map(FolderMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}/root")
    public ResponseEntity<List<FolderResponseDTO>> getRootFoldersByUser(@PathVariable Long userId) {
        List<Folder> rootFolders = folderService.getRootFoldersByUserId(userId);

        List<FolderResponseDTO> response = rootFolders.stream()
                .map(FolderMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
    @GetMapping("/{id}/subfolders")
    public ResponseEntity<List<FolderResponseDTO>> getSubFolders(@PathVariable("id") Long id) {
        List<Folder> subFolders = folderService.getSubFoldersByFolderId(id);
        List<FolderResponseDTO> response = subFolders.stream()
                .map(FolderMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FolderResponseDTO> updateFolder(@PathVariable Long id,
                                               @Valid @RequestBody UpdateFolderDTO updateFolderDTO) {
        // Lógica de atualização
        Folder updatedFolder = folderService.updateFolder(updateFolderDTO, id);
        FolderResponseDTO response = FolderMapper.toDto(updatedFolder);
        return ResponseEntity.ok(response);
    }



}
