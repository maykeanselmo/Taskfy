package com.taskfy.core.application.controller;

import com.taskfy.core.application.dto.response.TaskTagResponseDTO;
import com.taskfy.core.domain.tasks.service.TaskTagService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/tasks/{taskId}/tags")
@RequiredArgsConstructor
public class TaskTagController {
    private final TaskTagService taskTagService;

    @PostMapping("/{tagId}")
    public ResponseEntity<TaskTagResponseDTO> addTagToTask(@PathVariable Long taskId, @PathVariable Long tagId) {
        return ResponseEntity.ok(taskTagService.addTagToTask(taskId, tagId));
    }

    @GetMapping
    public ResponseEntity<List<TaskTagResponseDTO>> getTagsByTask(@PathVariable Long taskId) {
        return ResponseEntity.ok(taskTagService.getTagsByTask(taskId));
    }

    @DeleteMapping("/{tagId}")
    public ResponseEntity<Void> removeTagFromTask(@PathVariable Long taskId, @PathVariable Long tagId) {
        taskTagService.removeTagFromTask(taskId, tagId);
        return ResponseEntity.noContent().build();
    }

}
