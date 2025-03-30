package com.taskfy.core.application.dto.response;

import com.taskfy.core.domain.tasks.model.Tag;
import com.taskfy.core.domain.tasks.model.Tasks;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class TaskTagResponseDTO {

    private Long taskId;

    private Long tagId;
}
