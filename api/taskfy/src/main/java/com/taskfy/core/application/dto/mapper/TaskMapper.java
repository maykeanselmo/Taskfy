package com.taskfy.core.application.dto.mapper;

import com.taskfy.core.application.dto.request.TaskCreateDTO;
import com.taskfy.core.application.dto.response.TaskResponseDTO;
import com.taskfy.core.domain.tasks.model.Tasks;
import org.modelmapper.ModelMapper;

public class TaskMapper {
    public  static TaskResponseDTO toResponseDto(Tasks task) {
        return  new ModelMapper().map(task, TaskResponseDTO.class);
    }

    public static Tasks toTask(TaskCreateDTO dto) {
        return new ModelMapper().map(dto, Tasks.class);
    }
}
