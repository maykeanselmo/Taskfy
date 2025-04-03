package com.taskfy.core.application.dto.request;

import com.taskfy.core.domain.tasks.enums.Priority;
import com.taskfy.core.domain.tasks.enums.Status;
import com.taskfy.core.domain.tasks.model.Folder;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskCreateDTO {

    @NotNull(message = "Folder ID cannot be null")
    @ManyToOne
    @JoinColumn(name = "folder_id", nullable = false)
    private Folder folder;

    @NotBlank(message = "Title cannot be empty")
    @Size(max = 255, message = "Title cannot be longer than 255 characters")
    @Column(name = "title", nullable = false)
    private String title;

    @Size(max = 500, message = "Content cannot be longer than 500 characters")
    @Column(name = "content", nullable = false)
    private String content;

    @FutureOrPresent(message = "Due date must be today or in the future")
    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @NotNull(message = "Status cannot be null")
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @NotNull(message = "Priority cannot be null")
    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    private Priority priority;

}
