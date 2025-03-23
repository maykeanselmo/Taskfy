package com.taskfy.core.domain.tasks.service;

import com.taskfy.core.domain.tasks.exception.FolderNotFoundException;
import com.taskfy.core.domain.tasks.model.Folder;
import com.taskfy.core.domain.tasks.model.Tasks;
import com.taskfy.core.domain.tasks.repository.FolderRepository;
import com.taskfy.core.domain.tasks.repository.TaskRepository;
import com.taskfy.core.domain.users.exeption.UserAlreadyExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

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
}
