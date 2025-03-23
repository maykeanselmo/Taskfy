package com.taskfy.core.application.controller;

import com.taskfy.core.application.dto.mapper.FolderMapper;
import com.taskfy.core.application.dto.request.FolderCreateDTO;
import com.taskfy.core.application.dto.response.FolderResponseDTO;
import com.taskfy.core.domain.tasks.model.Folder;
import com.taskfy.core.domain.tasks.service.FolderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1")
public class FolderController {

    private final FolderService folderService;

    @PostMapping("/folders")
    public ResponseEntity<FolderResponseDTO> createFolder(@Valid @RequestBody FolderCreateDTO folderCreateDTO) {
        Folder createdFolder = folderService.createFolder(folderCreateDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(FolderMapper.toDto(createdFolder));
    }

}
