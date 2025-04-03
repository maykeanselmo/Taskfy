package com.taskfy.core.application.dto.mapper;

import com.taskfy.core.application.dto.request.TagCreateDto;
import com.taskfy.core.application.dto.response.TagResponseDTO;
import com.taskfy.core.domain.tasks.model.Tag;
import org.modelmapper.ModelMapper;

public class TagMapper {
    public  static TagResponseDTO toResponse(Tag tag) {
        return  new ModelMapper().map(tag, TagResponseDTO.class);
    }

    public static Tag toTag(TagCreateDto dto) {
        return new ModelMapper().map(dto, Tag.class);
    }
}
