package com.taskfy.core.domain.tasks.service;

import com.taskfy.core.application.dto.mapper.TagMapper;
import com.taskfy.core.application.dto.request.TagCreateDto;
import com.taskfy.core.application.dto.response.TagResponseDTO;
import com.taskfy.core.domain.tasks.model.Tag;
import com.taskfy.core.domain.tasks.repository.TagRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TagService {
    private TagRepository tagRepository;

    public TagResponseDTO createTag(TagCreateDto dto) {
        if (tagRepository.existsByName(dto.getName())) {
            throw new RuntimeException("A tag '" + dto.getName() + "' já existe.");
        }

        Tag tag = Tag.builder()
                .name(dto.getName())
                .build();

        Tag savedTag = tagRepository.save(tag);
        return TagMapper.toResponse(savedTag);
    }

    public List<TagResponseDTO> getAllTags() {
        return tagRepository.findAll()
                .stream()
                .map(TagMapper::toResponse)
                .collect(Collectors.toList());
    }

    public TagResponseDTO getTagById(Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag não encontrada."));
        return TagMapper.toResponse(tag);
    }

    public TagResponseDTO updateTag(Long id, TagCreateDto dto) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag não encontrada."));

        tag.setName(dto.getName());
        Tag updatedTag = tagRepository.save(tag);

        return TagMapper.toResponse(updatedTag);
    }

    public void deleteTag(Long id) {
        if (!tagRepository.existsById(id)) {
            throw new RuntimeException("Tag não encontrada.");
        }
        tagRepository.deleteById(id);
    }

}
