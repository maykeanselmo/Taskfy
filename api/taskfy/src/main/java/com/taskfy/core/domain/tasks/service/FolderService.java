package com.taskfy.core.domain.tasks.service;

import com.taskfy.core.application.dto.mapper.FolderMapper;
import com.taskfy.core.application.dto.request.FolderCreateDTO;
import com.taskfy.core.application.dto.request.UpdateFolderDTO;
import com.taskfy.core.domain.tasks.exception.AccessDeniedException;
import com.taskfy.core.domain.tasks.exception.FolderNotFoundException;
import com.taskfy.core.domain.tasks.model.Folder;
import com.taskfy.core.domain.tasks.repository.FolderRepository;
import com.taskfy.core.domain.users.model.Users;
import com.taskfy.core.domain.users.repository.UsersRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class FolderService {

    private final FolderRepository folderRepository;
    private final UsersRepository userRepository;

    @Transactional
    public Folder createFolder(@Valid FolderCreateDTO folderCreateDTO, Long authenticatedUserId) {
        log.info("Criando pasta: {}", folderCreateDTO.getName());

        // Verificar se o usuário corresponde ao usuário autenticado
        Users user = userRepository.findById(authenticatedUserId)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));

        // Se parentFolder estiver presente e tiver um ID, busca no banco; caso contrário, mantém como null (pasta root)
        Folder parentFolder = (folderCreateDTO.getParentFolder() != null && folderCreateDTO.getParentFolder().getId() != null)
                ? folderRepository.findById(folderCreateDTO.getParentFolder().getId())
                .orElseThrow(() -> new IllegalArgumentException("Pasta não encontrada"))
                : null;

        Folder newFolder = Folder.builder()
                .user(user)
                .parentFolder(parentFolder)
                .name(folderCreateDTO.getName())
                .createdAt(java.time.LocalDateTime.now())
                .updatedAt(java.time.LocalDateTime.now())
                .build();

        return folderRepository.save(newFolder);
    }

    @Transactional
    public Folder getFolderByID(Long id, Long authenticatedUserId) {
        Folder folder = folderRepository.findFolderWithSubFoldersById(id);

        if (!folder.getUser().getId().equals(authenticatedUserId)) {
            throw new AccessDeniedException("Você não tem permissão para visualizar ou modificar esta pasta.");
        }

        return folder;
    }

    @Transactional
    public void deleteFolder(Long id, Long authenticatedUserId) {
        Folder folder = folderRepository.findById(id)
                .orElseThrow(() -> new FolderNotFoundException("Pasta não encontrada com id: " + id));

        if (!folder.getUser().getId().equals(authenticatedUserId)) {
            throw new AccessDeniedException("Você não tem permissão para visualizar ou modificar esta pasta.");
        }

        folderRepository.deleteById(id);
    }

    @Transactional
    public List<Folder> getFoldersByUserId(Long userId, Long authenticatedUserId) {
        if (!userId.equals(authenticatedUserId)) {
            throw new AccessDeniedException("Você não tem permissão para visualizar ou modificar esta pasta.");
        }

        return folderRepository.findByUserId(userId);
    }

    @Transactional
    public List<Folder> getRootFoldersByUserId(Long userId, Long authenticatedUserId) {
        if (!userId.equals(authenticatedUserId)) {
            throw new AccessDeniedException("Você não tem permissão para visualizar ou modificar esta pasta.");
        }

        return folderRepository.findRootFoldersByUserId(userId);
    }

    @Transactional
    public List<Folder> getSubFoldersByFolderId(Long folderId, Long authenticatedUserId) {
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new FolderNotFoundException("Pasta não encontrada com id: " + folderId));

        if (!folder.getUser().getId().equals(authenticatedUserId)) {
            throw new AccessDeniedException("Você não tem permissão para visualizar ou modificar esta pasta.");
        }

        return folder.getSubFolders();
    }

    @Transactional
    public Folder updateFolder(UpdateFolderDTO updateFolderDTO, Long id, Long authenticatedUserId) {
        Folder folder = folderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pasta não encontrada"));

        if (!folder.getUser().getId().equals(authenticatedUserId)) {
            throw new AccessDeniedException("Você não tem permissão para visualizar ou modificar esta pasta.");
        }

        folder.setName(updateFolderDTO.getName());

        if (updateFolderDTO.getParentFolderId() != null) {
            Folder parentFolder = folderRepository.findById(updateFolderDTO.getParentFolderId())
                    .orElseThrow(() -> new IllegalArgumentException("Pasta pai não encontrada"));
            folder.setParentFolder(parentFolder);
        } else {
            folder.setParentFolder(null);
        }

        return folderRepository.save(folder);
    }
}
