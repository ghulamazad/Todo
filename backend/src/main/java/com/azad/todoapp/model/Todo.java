package com.azad.todoapp.model;

import com.azad.todoapp.enums.TodoStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.io.Serializable;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "todos")
public class Todo implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String description;
    @Enumerated(EnumType.STRING)
    private TodoStatus status;
    private Date created;
    private Date updated;
    private Boolean isDeleted;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Project project;
}