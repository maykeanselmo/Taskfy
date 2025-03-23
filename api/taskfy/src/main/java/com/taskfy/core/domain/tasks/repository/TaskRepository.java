package com.taskfy.core.domain.tasks.repository;

import com.taskfy.core.domain.tasks.model.Tasks;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository  extends JpaRepository<Tasks, Long> {
}
