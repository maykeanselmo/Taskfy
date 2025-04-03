package com.taskfy.core.domain.tasks.repository;

import com.taskfy.core.domain.tasks.model.Tag;
import com.taskfy.core.domain.tasks.model.TaskTag;
import com.taskfy.core.domain.tasks.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskTagRepository extends JpaRepository<TaskTag, Long> {
    boolean existsByTaskIdAndTagId(Long taskId, Long tagId);
    Optional<TaskTag> findByTaskIdAndTagId(Long taskId, Long tagId);
    List<TaskTag> findByTaskId(Long taskId);
}
