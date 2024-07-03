package com.azad.todoapp.service;

import com.azad.todoapp.controller.SearchRequestTodo;
import com.azad.todoapp.enums.TodoStatus;
import com.azad.todoapp.exception.ApiError;
import com.azad.todoapp.model.Project;
import com.azad.todoapp.model.Todo;
import com.azad.todoapp.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository todoRepository;
    private final ProjectService projectService;

    public Todo getTodo(Integer id) throws ApiError {
        var todo = todoRepository.findById(id);
        if (todo.isEmpty()) {
            throw new ApiError("Todo not found.", HttpStatus.NOT_FOUND);
        }
        return todo.get();
    }

    public List<Todo> getTodos(Integer projectId) {
        return todoRepository.findByProjectIdAndIsDeleted(projectId, false);
    }

    public void setIsDeletedTodos(Integer id) throws  ApiError{
        var todo = todoRepository.findById(id);
        if(todo.isPresent()){
            todo.get().setIsDeleted(true);
            todoRepository.save(todo.get());
        }else{
            throw new ApiError("Todo not found.", HttpStatus.NOT_FOUND);
        }
    }

    public void deleteTodos(Integer id) {
        todoRepository.deleteById(id);
    }

    public Todo createTodos(Integer projectId, Todo todo) throws ApiError {
        try {
            Project project = projectService.getProject(projectId);
            Todo newTodo = Todo.builder()
                    .description(todo.getDescription())
                    .status(TodoStatus.PENDING)
                    .created(new Date())
                    .updated(new Date())
                    .isDeleted(false)
                    .project(project)
                    .build();
            todoRepository.save(newTodo);
            return newTodo;
        } catch (Exception e) {
            if (e instanceof ApiError) {
                throw e;
            }
            throw new ApiError("Not able to create todo.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Todo markCompleted(Integer todoId) throws ApiError {
        var data = todoRepository.findById(todoId);
        if (data.isEmpty()) {
            throw new ApiError("Todo not found.");
        }
        Todo existingTodo = data.get();
        existingTodo.setStatus(TodoStatus.COMPLETED);
        existingTodo.setUpdated(new Date());
        todoRepository.save(existingTodo);
        return existingTodo;
    }

    public Todo updateTodos(Integer todoId, String description) throws ApiError {
        var data = todoRepository.findById(todoId);
        if (data.isEmpty()) {
            throw new ApiError("Todo not found.");
        }
        Todo existingTodo = data.get();
        existingTodo.setDescription(description);
        existingTodo.setUpdated(new Date());
        todoRepository.save(existingTodo);
        return existingTodo;
    }

    public List<Todo> getAllDeletedTodos() {
        return todoRepository.findByIsDeleted(true);
    }

    public boolean restoredTodos(Integer todoId) throws ApiError {
        var todo = todoRepository.findById(todoId);
        if(todo.isEmpty()){
            throw new ApiError("Todo is not found");
        }
        todo.get().setIsDeleted(false);
        todoRepository.save(todo.get());
        return true;
    }

    public List<Todo> searchTodo(SearchRequestTodo requestTodo) {
       return todoRepository.findByProjectIdAndDescriptionContaining(requestTodo.projectId(),requestTodo.todo());
    }
}
