package com.taskfy.core.domain.tasks.repository;

import com.taskfy.core.domain.tasks.model.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {
    List<Folder> findByUserId(Long userId);

    @Query("SELECT f FROM Folder f WHERE f.parentFolder IS NULL AND f.user.id = :userId")
    List<Folder> findRootFoldersByUserId(Long userId);

    @Query("SELECT f FROM Folder f LEFT JOIN FETCH f.subFolders WHERE f.id = :id")
    Folder findFolderWithSubFoldersById(Long id);
}
