package com.taskfy.core.domain.tasks.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.*;
import org.springframework.scheduling.config.Task;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
@Getter
@Setter
@Table(name = "task_tag")
public class TaskTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull(message = "Task ID cannot be null")
    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    @NotNull(message = "Tag ID cannot be null")
    @ManyToOne
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;


    @PastOrPresent(message = "Creation date must be in the past or present")
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PastOrPresent(message = "Update date must be in the past or present")
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;


    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}
