package com.taskfy.core.domain.tasks.service;

import com.taskfy.core.application.dto.request.FolderCreateDTO;
import com.taskfy.core.domain.tasks.model.Folder;
import com.taskfy.core.domain.tasks.repository.FolderRepository;
import com.taskfy.core.domain.users.model.Users;
import com.taskfy.core.domain.users.repository.UsersRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class FolderService {

    private final FolderRepository folderRepository;;
    private final UsersRepository userRepository;

    @Transactional
    public Folder createFolder(@Valid FolderCreateDTO folderCreateDTO) {
        Users user = userRepository.findById(folderCreateDTO.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Folder parentFolder = null;
        if (folderCreateDTO.getParentFolder() != null) {
            parentFolder = folderRepository.findById(folderCreateDTO.getParentFolder().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Parent folder not found"));
        }

        Folder newFolder = new Folder();
        newFolder.setUser(user);
        newFolder.setParentFolder(parentFolder);
        newFolder.setName(folderCreateDTO.getName());

        return folderRepository.save(newFolder);
    }


}
