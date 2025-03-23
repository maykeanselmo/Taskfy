package com.taskfy.core.domain.tasks.repository;

import com.taskfy.core.domain.tasks.model.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {
}
