package com.taskfy.core.domain.tasks.model;

import com.taskfy.core.domain.tasks.enums.Priority;
import com.taskfy.core.domain.tasks.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
@Table(name = "tasks")
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long folderId;
    private String title;
    private String content;
    private LocalDate dueDate;
    private Status status;
    private Priority priority;
    private LocalDateTime createAt;
    private LocalDateTime updatedAt;

}
