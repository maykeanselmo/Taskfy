package com.taskfy.core.domain.tasks.repository;

import com.taskfy.core.domain.tasks.model.TaskTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskTagRepository extends JpaRepository<TaskTag, Long> {
}
