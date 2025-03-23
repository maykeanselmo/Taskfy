package com.taskfy.core.domain.tasks.service;

import com.taskfy.core.application.dto.mapper.TaskMapper;
import com.taskfy.core.application.dto.request.TaskCreateDTO;
import com.taskfy.core.application.dto.response.TaskResponseDTO;
import com.taskfy.core.domain.tasks.enums.Status;
import com.taskfy.core.domain.tasks.exception.AccessDeniedException;
import com.taskfy.core.domain.tasks.exception.FolderNotFoundException;
import com.taskfy.core.domain.tasks.model.Folder;
import com.taskfy.core.domain.tasks.model.Tasks;
import com.taskfy.core.domain.tasks.repository.FolderRepository;
import com.taskfy.core.domain.tasks.repository.TaskRepository;
import com.taskfy.core.domain.users.model.Users;
import com.taskfy.core.domain.users.repository.UsersRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final FolderRepository folderRepository;
    private final UsersRepository usersRepository;

    @Transactional
    public Tasks createTask(TaskCreateDTO dto, Long authenticatedUserId) {
        Folder folder = folderRepository.findById(dto.getFolder().getId())
                .orElseThrow(() -> new FolderNotFoundException("Pasta não encontrada com id: " + dto.getFolder().getId()));

        if (!folder.getUser().getId().equals(authenticatedUserId)) {
            throw new AccessDeniedException("Você não tem permissão para adicionar tarefas nesta pasta.");
        }

        Tasks task = TaskMapper.toTask(dto);
        task.setFolder(folder);
        return taskRepository.save(task);
    }

    @Transactional
    public Tasks getTaskById(Long id, Long authenticatedUserId) {
        Tasks task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nenhuma tarefa foi encontrada com este id: " + id));

        if (!task.getFolder().getUser().getId().equals(authenticatedUserId)) {
            throw new AccessDeniedException("Você não tem permissão para visualizar esta tarefa.");
        }

        return task;
    }

    @Transactional
    public void deleteTask(Long id, Long authenticatedUserId) {
        Tasks task = getTaskById(id, authenticatedUserId);
        taskRepository.delete(task);
    }

    @Transactional
    public Tasks updateTask(Long id, TaskCreateDTO dto, Long authenticatedUserId) {
        Tasks task = getTaskById(id, authenticatedUserId);

        Folder folder = folderRepository.findById(dto.getFolder().getId())
                .orElseThrow(() -> new FolderNotFoundException("Pasta não encontrada com id: " + dto.getFolder().getId()));

        if (!folder.getUser().getId().equals(authenticatedUserId)) {
            throw new AccessDeniedException("Você não tem permissão para mover esta tarefa para essa pasta.");
        }

        task.setTitle(dto.getTitle());
        task.setContent(dto.getContent());
        task.setDueDate(dto.getDueDate());
        task.setPriority(dto.getPriority());
        task.setStatus(dto.getStatus());
        task.setFolder(folder);

        return taskRepository.save(task);
    }

    @Transactional
    public List<TaskResponseDTO> getTasksByFolder(Long folderId, Long authenticatedUserId) {
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new FolderNotFoundException("Pasta não encontrada com id: " + folderId));

        if (!folder.getUser().getId().equals(authenticatedUserId)) {
            throw new AccessDeniedException("Você não tem permissão para visualizar as tarefas desta pasta.");
        }

        List<Tasks> tasks = taskRepository.findByFolderId(folderId);
        return tasks.stream().map(TaskMapper::toResponseDto).collect(Collectors.toList());
    }

    @Transactional
    public TaskResponseDTO updateTaskStatus(Long id, Status newStatus, Long authenticatedUserId) {
        Tasks task = getTaskById(id, authenticatedUserId);
        task.setStatus(newStatus);
        return TaskMapper.toResponseDto(taskRepository.save(task));
    }

    public List<TaskResponseDTO> getAllTasks(Long authenticatedUserId) {
        List<Tasks> tasks = taskRepository.findAll().stream()
                .filter(task -> task.getFolder().getUser().getId().equals(authenticatedUserId))
                .collect(Collectors.toList());
        return tasks.stream().map(TaskMapper::toResponseDto).collect(Collectors.toList());
    }
}
