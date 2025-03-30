package com.taskfy.core.application.controller;

import com.taskfy.core.application.dto.request.TagCreateDto;
import com.taskfy.core.application.dto.response.TagResponseDTO;
import com.taskfy.core.domain.tasks.service.TagService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/tags")
public class TagController {
    private final TagService tagService;

    @PostMapping()
    public ResponseEntity<TagResponseDTO> createTag(@Valid @RequestBody TagCreateDto dto) {
        return ResponseEntity.ok(tagService.createTag(dto));
    }

    @GetMapping
    public ResponseEntity<List<TagResponseDTO>> getAllTags() {
        return ResponseEntity.ok(tagService.getAllTags());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TagResponseDTO> getTagById(@PathVariable Long id) {
        return ResponseEntity.ok(tagService.getTagById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TagResponseDTO> updateTag(@PathVariable Long id, @Valid @RequestBody TagCreateDto dto) {
        return ResponseEntity.ok(tagService.updateTag(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id) {
        tagService.deleteTag(id);
        return ResponseEntity.noContent().build();
    }
}
