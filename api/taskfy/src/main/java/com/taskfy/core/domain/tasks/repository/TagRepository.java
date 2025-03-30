package com.taskfy.core.domain.tasks.repository;

import com.taskfy.core.domain.tasks.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    boolean existsByName(String name);
}
