package com.taskfy.core.domain.tasks.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
@Getter
@Setter
@Table(name = "tag")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Size(max = 100, message = "Folder name cannot be longer than 100 characters")
    @Column(name = "name", nullable = false)
    private String name;

}
