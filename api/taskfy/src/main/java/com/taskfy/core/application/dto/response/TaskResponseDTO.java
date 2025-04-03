package com.taskfy.core.application.dto.response;

import com.taskfy.core.domain.tasks.enums.Priority;
import com.taskfy.core.domain.tasks.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponseDTO {

    private String title;
    private String content;
    private LocalDate dueDate;
    private Status status;
    private Priority priority;
    private FolderResponseDTO folder;



}
