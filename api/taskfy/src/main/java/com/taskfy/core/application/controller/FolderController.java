package com.taskfy.core.application.controller;

import com.taskfy.core.application.dto.mapper.FolderMapper;
import com.taskfy.core.application.dto.request.FolderCreateDTO;
import com.taskfy.core.application.dto.response.FolderResponseDTO;
import com.taskfy.core.domain.tasks.exception.FolderNotFoundException;
import com.taskfy.core.domain.tasks.model.Folder;
import com.taskfy.core.domain.tasks.service.FolderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<FolderResponseDTO> createFolder(@PathVariable("id") Long id) {
        Folder createdFolder = folderService.getFolderByID(id);
        return ResponseEntity.ok(FolderMapper.toDto(createdFolder));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFolder(@PathVariable("id") Long id) {
            folderService.deleteFolder(id);
            return ResponseEntity.noContent().build();

    }

}
