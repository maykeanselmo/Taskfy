package com.taskfy.core.application.dto.mapper;

import com.taskfy.core.application.dto.request.UpdateFolderDTO;
import com.taskfy.core.application.dto.response.FolderResponseDTO;
import com.taskfy.core.domain.tasks.model.Folder;
import org.modelmapper.ModelMapper;

public class FolderMapper {

    public  static FolderResponseDTO toDto(Folder folder) {
        return  new ModelMapper().map(folder, FolderResponseDTO.class);
    }

    public static Folder toFolder(FolderResponseDTO dto) {
        return new ModelMapper().map(dto, Folder.class);
    }
    public static Folder toFolder(UpdateFolderDTO dto) {
        return new ModelMapper().map(dto, Folder.class);
    }
}
