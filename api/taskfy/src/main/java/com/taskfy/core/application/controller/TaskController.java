package com.taskfy.core.application.controller;

import com.taskfy.core.application.dto.mapper.TaskMapper;
import com.taskfy.core.application.dto.request.TaskCreateDTO;
import com.taskfy.core.application.dto.response.TaskResponseDTO;
import com.taskfy.core.domain.tasks.model.Tasks;
import com.taskfy.core.domain.tasks.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
