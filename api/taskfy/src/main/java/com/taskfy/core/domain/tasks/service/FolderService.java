package com.taskfy.core.domain.tasks.service;

import com.taskfy.core.application.dto.mapper.FolderMapper;
import com.taskfy.core.application.dto.request.FolderCreateDTO;
import com.taskfy.core.application.dto.request.UpdateFolderDTO;
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

    private final FolderRepository folderRepository;;
    private final UsersRepository userRepository;

    @Transactional
    public Folder createFolder(@Valid FolderCreateDTO folderCreateDTO) {
        log.info("Criando pasta: {}", folderCreateDTO.getName());

        Users user = userRepository.findById(folderCreateDTO.getUser().getId())
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
    public Folder getFolderByID(Long id) {
        return folderRepository.findFolderWithSubFoldersById(id);
    }

    @Transactional
    public void deleteFolder(Long id) {
        if (!folderRepository.existsById(id)) {
            throw new FolderNotFoundException("Pasta não encontrada com id: " + id);
        }
        folderRepository.deleteById(id);
    }

    @Transactional
    public List<Folder> getFoldersByUserId(Long userId) {
        return folderRepository.findByUserId(userId);
    }

    @Transactional
    public List<Folder> getRootFoldersByUserId(Long userId) {
        return folderRepository.findRootFoldersByUserId(userId);
    }

    @Transactional
    public List<Folder> getSubFoldersByFolderId(Long folderId) {
        Folder folder = folderRepository.findById(folderId)
                .orElseThrow(() -> new FolderNotFoundException("Pasta não encontrada com id: " + folderId));

        return folder.getSubFolders();
    }

    @Transactional
    public Folder updateFolder(UpdateFolderDTO updateFolderDTO, Long id) {

        Folder folder = folderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Pasta não encontrada"));

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
