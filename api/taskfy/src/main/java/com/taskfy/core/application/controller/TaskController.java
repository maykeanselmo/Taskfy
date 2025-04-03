package com.taskfy.core.application.controller;

import com.taskfy.core.application.dto.mapper.TaskMapper;
import com.taskfy.core.application.dto.request.TaskCreateDTO;
import com.taskfy.core.application.dto.request.TaskStatusUpdateDTO;
import com.taskfy.core.application.dto.response.TaskResponseDTO;
import com.taskfy.core.domain.tasks.model.Tasks;
import com.taskfy.core.domain.tasks.service.TaskService;
import com.taskfy.core.domain.users.model.Users;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/tasks")
public class TaskController {

    private final TaskService taskService;

    @PostMapping()
    public ResponseEntity<TaskResponseDTO> createTask(@Valid @RequestBody TaskCreateDTO dto, Authentication authentication) {

        Long userId = getAuthenticatedUserId(authentication);

        Tasks task = taskService.createTask(dto,userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(TaskMapper.toResponseDto(task));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> getTaskById(@PathVariable("id") Long id, Authentication authentication) {

        Long userId = getAuthenticatedUserId(authentication);

        Tasks task = taskService.getTaskById(id, userId);
        return ResponseEntity.ok(TaskMapper.toResponseDto(task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable("id") Long id, Authentication authentication) {
        Long userId = getAuthenticatedUserId(authentication);
        taskService.deleteTask(id, userId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> updateTask(@Valid @RequestBody TaskCreateDTO dto, @PathVariable("id") Long id, Authentication authentication) {

        Long userId = getAuthenticatedUserId(authentication);

        Tasks taskUpdated = taskService.updateTask(id, dto, userId);
        return ResponseEntity.ok(TaskMapper.toResponseDto(taskUpdated));
    }

    @GetMapping("/folder/{folderId}")
    public ResponseEntity<List<TaskResponseDTO>> getTasksByFolder(@PathVariable("folderId") Long folderId, Authentication authentication) {

        Long userId = getAuthenticatedUserId(authentication);
        List<TaskResponseDTO> tasks = taskService.getTasksByFolder(folderId, userId);
        return ResponseEntity.ok(tasks);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TaskResponseDTO> updateTaskStatus(@PathVariable("id") Long id, @RequestBody @Valid TaskStatusUpdateDTO statusUpdateDTO, Authentication authentication) {
        Long userId = getAuthenticatedUserId(authentication);
        TaskResponseDTO updatedTask = taskService.updateTaskStatus(id, statusUpdateDTO.getStatus(), userId);
        return ResponseEntity.ok(updatedTask);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> getAllTasks(Authentication authentication) {
        Long userId = getAuthenticatedUserId(authentication);
        List<TaskResponseDTO> tasks = taskService.getAllTasks(userId);
        return ResponseEntity.ok(tasks);
    }

    private Long getAuthenticatedUserId(Authentication authentication){
        Users user = (Users) authentication.getPrincipal();
        return user.getId();
    }
}
