package com.taskfy.core.application.dto.request;

import com.taskfy.core.domain.tasks.model.Tag;
import com.taskfy.core.domain.tasks.model.Tasks;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class TaskTagCreateDTO {

    @NotNull(message = "Task ID cannot be null")
    private Long taskId;

    @NotNull(message = "Tag ID cannot be null")
    private Long tagId;

}
