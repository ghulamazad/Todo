package com.azad.todoapp.controller;

import com.azad.todoapp.exception.ApiError;
import com.azad.todoapp.model.Project;
import com.azad.todoapp.model.User;
import com.azad.todoapp.service.ProjectService;
import com.azad.todoapp.utils.CustomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping("/")
    public ResponseEntity<CustomResponse<List<Project>>> projects() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Project> projects = projectService.getProjects(user.getId());
        return ResponseEntity.ok(CustomResponse.getSuccess(projects));
    }

    @PostMapping("/")
    public ResponseEntity<CustomResponse<Project>> createProject(@Validated @RequestBody Project project) throws ApiError {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Project newProject = projectService.createProjects(project, user);
        return ResponseEntity.ok(CustomResponse.getSuccess(newProject));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomResponse<Project>> getProject(@PathVariable Integer id) throws ApiError {
        Project project = projectService.getProject(id);
        return ResponseEntity.ok(CustomResponse.getSuccess(project));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CustomResponse<Project>> DeleteProject(@PathVariable Integer id) throws ApiError {
        projectService.deleteProjects(id);
        return ResponseEntity.ok(CustomResponse.getSuccess(null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomResponse<Project>> updateProject(@PathVariable Integer id, @RequestBody Project project) throws ApiError {
        Project newProject = projectService.updateProjects(id, project.getTitle());
        return ResponseEntity.ok(CustomResponse.getSuccess(newProject));
    }
}