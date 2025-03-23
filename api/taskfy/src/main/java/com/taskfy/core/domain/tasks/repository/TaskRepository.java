package com.taskfy.core.domain.tasks.repository;

import com.taskfy.core.domain.tasks.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository  extends JpaRepository<Tasks, Long> {
    List<Tasks> findByFolderId(Long folderId);
}
