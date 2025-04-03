package com.taskfy.core.application.dto.request;

import com.taskfy.core.domain.tasks.enums.Status;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskStatusUpdateDTO {
    @NotNull(message = "Status cannot be null")
    private Status status;
}
