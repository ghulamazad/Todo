package com.azad.todoapp.controller;

import com.azad.todoapp.exception.ApiError;
import com.azad.todoapp.model.Todo;
import com.azad.todoapp.service.TodoService;
import com.azad.todoapp.utils.CustomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @GetMapping("/{projectId}")
    public ResponseEntity<CustomResponse<List<Todo>>> todos(@PathVariable Integer projectId) {
        List<Todo> Todos = todoService.getTodos(projectId);
        return ResponseEntity.ok(CustomResponse.getSuccess(Todos));
    }

    @PostMapping("/{projectId}")
    public ResponseEntity<CustomResponse<Todo>> createTodo(@PathVariable Integer projectId, @Validated @RequestBody Todo todo) throws ApiError {
        Todo newTodo = todoService.createTodos(projectId, todo);
        return ResponseEntity.ok(CustomResponse.getSuccess(newTodo));
    }

    @PostMapping("/{projectId}/{id}")
    public ResponseEntity<CustomResponse<Todo>> markCompleted(@PathVariable Integer projectId, @PathVariable Integer id) throws ApiError {
        Todo Todo = todoService.markCompleted(id);
        return ResponseEntity.ok(CustomResponse.getSuccess(Todo));
    }

    @DeleteMapping("/{projectId}/{id}")
    public ResponseEntity<CustomResponse<Todo>> DeleteTodo(@PathVariable Integer projectId, @PathVariable Integer id) throws ApiError {
        todoService.deleteTodos(id);
        return ResponseEntity.ok(CustomResponse.getSuccess(null));
    }

    @PutMapping("/{projectId}/{id}")
    public ResponseEntity<CustomResponse<Todo>> updateTodo(@PathVariable Integer id, @RequestBody Todo Todo) throws ApiError {
        Todo newTodo = todoService.updateTodos(id, Todo.getDescription());
        return ResponseEntity.ok(CustomResponse.getSuccess(newTodo));
    }
}