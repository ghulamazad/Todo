package com.azad.todoapp.repository;

import com.azad.todoapp.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Integer> {
    List<Todo> findByProjectId(Integer projectId);
}
