package com.azad.todoapp.repository;

import com.azad.todoapp.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
    List<Todo> findByProjectIdAndIsDeleted(Integer projectId, boolean isDeleted);
    List<Todo> findByIsDeleted(boolean isDeleted);
    List<Todo> findByProjectIdAndDescriptionContaining(Integer projectId, String description);
}
