package com.taskfy.core.application.dto.mapper;

import com.taskfy.core.application.dto.request.TagCreateDto;
import com.taskfy.core.application.dto.response.TagResponseDTO;
import com.taskfy.core.application.dto.response.TaskTagResponseDTO;
import com.taskfy.core.domain.tasks.model.Tag;
import com.taskfy.core.domain.tasks.model.TaskTag;
import org.modelmapper.ModelMapper;

public class TaskTagMapper {

    public static TaskTagResponseDTO toResponseDTO(TaskTag taskTag) {
        return  new ModelMapper().map(taskTag, TaskTagResponseDTO.class);
    }

    public static Tag toTag(TagCreateDto dto) {
        return new ModelMapper().map(dto, Tag.class);
    }
}
