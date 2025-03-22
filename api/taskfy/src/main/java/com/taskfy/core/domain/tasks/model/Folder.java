package com.taskfy.core.domain.tasks.model;

import com.taskfy.core.domain.users.model.Users;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
@Getter
@Setter
@Table(name = "folder")
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    // Relacionamento muitos-para-um com User (cada folder pertence a um user)
    @NotNull(message = "User ID cannot be null")
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    // Relacionamento auto-referencial: um folder pode ter outro folder como "pasta pai"
    @ManyToOne
    @JoinColumn(name = "parent_id", nullable = true)
    private Folder parentFolder;

    @NotBlank(message = "Folder name cannot be empty")
    @Size(max = 255, message = "Folder name cannot be longer than 255 characters")
    @Column(name = "name", nullable = false)
    private String name;

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
