package com.taskfy.core.domain.tasks.service;

import com.taskfy.core.application.dto.response.TaskTagResponseDTO;
import com.taskfy.core.domain.tasks.exception.TagAlreadyAssignedException;
import com.taskfy.core.domain.tasks.exception.TaskTagNotFoundException;
import com.taskfy.core.domain.tasks.model.TaskTag;
import com.taskfy.core.domain.tasks.repository.TaskTagRepository;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TaskTagService {
    private final TaskTagRepository taskTagRepository;

    public TaskTagResponseDTO addTagToTask(Long taskId, Long tagId) {
        try{
            if (taskTagRepository.existsByTaskIdAndTagId(taskId, tagId)) {
                throw new TagAlreadyAssignedException("Essa tag já está associada à tarefa.");
            }

            TaskTag taskTag = TaskTag.builder()
                    .taskId(taskId)
                    .tagId(tagId)
                    .build();

            taskTagRepository.save(taskTag);
            return new TaskTagResponseDTO(taskTag.getTaskId(), taskTag.getTagId());
        }catch (DataIntegrityViolationException e){
            throw new TaskTagNotFoundException("Tag não encontrada");
        }
    }

    public void removeTagFromTask(Long taskId, Long tagId) {
        TaskTag taskTag = taskTagRepository.findByTaskIdAndTagId(taskId, tagId)
                .orElseThrow(() -> new TaskTagNotFoundException("Tag não encontrada" + taskId));

        taskTagRepository.delete(taskTag);
    }

    public List<TaskTagResponseDTO> getTagsByTask(Long taskId) {
        List<TaskTag> taskTags = taskTagRepository.findByTaskId(taskId);
        if (taskTags.isEmpty()) {
            throw new TaskTagNotFoundException("Tag não encontrada" + taskId);
        }
        return taskTags.stream()
                .map(taskTag -> new TaskTagResponseDTO(taskTag.getTaskId(), taskTag.getTagId()))
                .collect(Collectors.toList());
    }
}
