package com.taskfy.core.application.controller;

import com.taskfy.core.application.dto.mapper.TaskMapper;
import com.taskfy.core.application.dto.request.TaskCreateDTO;
import com.taskfy.core.application.dto.request.TaskStatusUpdateDTO;
import com.taskfy.core.application.dto.response.TaskResponseDTO;
import com.taskfy.core.domain.tasks.model.Tasks;
import com.taskfy.core.domain.tasks.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/tasks")
public class TaskController {

    private final TaskService taskService;

    @PostMapping()
    public ResponseEntity<TaskResponseDTO> createTask(@Valid @RequestBody TaskCreateDTO dto){
        Tasks task = taskService.createTask(TaskMapper.toTask(dto));

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(TaskMapper.toResponseDto(task));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> getTaskById(@PathVariable("id") Long id){
        Tasks task = taskService.getTaskById(id);
        return ResponseEntity.ok(TaskMapper.toResponseDto(task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask (@PathVariable("id") Long id){
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public  ResponseEntity<TaskResponseDTO> updateTask (@Valid @RequestBody TaskCreateDTO dto , @PathVariable("id") Long id ){
        Tasks taskUpdated = taskService.updateTask(id, dto);
        return  ResponseEntity.ok(TaskMapper.toResponseDto(taskUpdated));

    }

    @GetMapping("/folder/{folderId}")
    public ResponseEntity<List<TaskResponseDTO>> getTasksByFolder(@PathVariable("folderId") Long folderId) {
        List<TaskResponseDTO> tasks = taskService.getTasksByFolder(folderId);
        return ResponseEntity.ok(tasks);
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<TaskResponseDTO> updateTaskStatus(
            @PathVariable("id") Long id,
            @RequestBody @Valid TaskStatusUpdateDTO statusUpdateDTO) {

        TaskResponseDTO updatedTask = taskService.updateTaskStatus(id, statusUpdateDTO.getStatus());
        return ResponseEntity.ok(updatedTask);
    }



}
