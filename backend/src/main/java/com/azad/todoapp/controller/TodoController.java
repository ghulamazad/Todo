package com.azad.todoapp.controller;

import com.azad.todoapp.exception.ApiError;
import com.azad.todoapp.model.Todo;
import com.azad.todoapp.service.TodoService;
import com.azad.todoapp.utils.CustomResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/api/v1/todos")
@RequiredArgsConstructor
@Slf4j
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
        todoService.setIsDeletedTodos(id);
        return ResponseEntity.ok(CustomResponse.getSuccess(null));
    }

    @PutMapping("/{projectId}/{id}")
    public ResponseEntity<CustomResponse<Todo>> updateTodo(@PathVariable Integer id, @RequestBody Todo Todo) throws ApiError {
        Todo newTodo = todoService.updateTodos(id, Todo.getDescription());
        return ResponseEntity.ok(CustomResponse.getSuccess(newTodo));
    }

    @GetMapping("/recycle-bin")
    public ResponseEntity<CustomResponse<List<Todo>>> recycleBin() {
        List<Todo> Todos = todoService.getAllDeletedTodos();
        return ResponseEntity.ok(CustomResponse.getSuccess(Todos));
    }

    @DeleteMapping("/{todo-id}")
    public ResponseEntity<CustomResponse<Boolean>> deleteTodoById(@PathVariable("todo-id") Integer todoId) {
        todoService.deleteTodos(todoId);
        return ResponseEntity.ok(CustomResponse.getSuccess(null));
    }

    @GetMapping("/restored-todo/{todo-id}")
    public ResponseEntity<CustomResponse<Boolean>> restoredTodo(@PathVariable("todo-id") Integer todoId) {
        boolean isRestored = false;
        try{
            isRestored = todoService.restoredTodos(todoId);
        }catch (ApiError e){
            log.warn(e.getMessage());
        }
        return ResponseEntity.ok(CustomResponse.getSuccess(isRestored));
    }


    @PostMapping("/search")
    public  ResponseEntity<CustomResponse<List<Todo>>> searchTodo(@RequestBody SearchRequestTodo requestTodo){
        return ResponseEntity.ok(CustomResponse.getSuccess(todoService.searchTodo(requestTodo)));
    }
}