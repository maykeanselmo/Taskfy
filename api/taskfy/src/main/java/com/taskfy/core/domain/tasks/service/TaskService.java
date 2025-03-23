package com.taskfy.core.domain.tasks.service;

import com.taskfy.core.application.dto.mapper.TaskMapper;
import com.taskfy.core.application.dto.request.TaskCreateDTO;
import com.taskfy.core.application.dto.response.TaskResponseDTO;
import com.taskfy.core.domain.tasks.exception.FolderNotFoundException;
import com.taskfy.core.domain.tasks.model.Folder;
import com.taskfy.core.domain.tasks.model.Tasks;
import com.taskfy.core.domain.tasks.repository.FolderRepository;
import com.taskfy.core.domain.tasks.repository.TaskRepository;
import com.taskfy.core.domain.users.exeption.UserAlreadyExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final FolderRepository folderRepository;

    @Transactional
    public Tasks createTask(Tasks task) {

        Folder folder = folderRepository.findById(task.getFolder().getId())
                .orElseThrow(() -> new FolderNotFoundException("Folder not found with id: " + task.getFolder().getId()));

        task.setFolder(folder);

        try {
            return taskRepository.save(task);
        } catch (DataIntegrityViolationException e) {
            throw new UserAlreadyExistsException("Task creation failed due to data integrity violation.");
        } catch (Exception e) {
            throw new RuntimeException("Erro ao criar tarefa. Tente novamente mais tarde.");
        }
    }

    @Transactional
    public Tasks getTaskById(Long id){
        return taskRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Nenhuma tarefa foi encontrado com este id: " + id)
        );
    }

    @Transactional
    public void deleteTask (Long id){
        taskRepository.deleteById(id);
    }

    @Transactional
    public Tasks updateTask(Long id, TaskCreateDTO dto) {

        Tasks taskUpdated = getTaskById(id);

        Folder folder = folderRepository.findById(dto.getFolder().getId())
                .orElseThrow(() -> new FolderNotFoundException("Folder not found with id: " + dto.getFolder().getId()));

        folder.getUser();

        taskUpdated.setTitle(dto.getTitle());
        taskUpdated.setContent(dto.getContent());
        taskUpdated.setDueDate(dto.getDueDate());
        taskUpdated.setPriority(dto.getPriority());
        taskUpdated.setStatus(dto.getStatus());
        taskUpdated.setFolder(folder);

        return taskRepository.save(taskUpdated);
    }

    public List<TaskResponseDTO> getTasksByFolder(Long folderId) {

        List<Tasks> tasks = taskRepository.findByFolderId(folderId);

        return tasks.stream()
                .map(TaskMapper::toResponseDto)
                .collect(Collectors.toList());
    }
}
