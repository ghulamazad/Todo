package com.azad.todoapp.service;

import com.azad.todoapp.exception.ApiError;
import com.azad.todoapp.model.Project;
import com.azad.todoapp.model.User;
import com.azad.todoapp.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public Project getProject(Integer id) throws ApiError {
        var project = projectRepository.findById(id);
        if (project.isEmpty()) {
            throw new ApiError("Project not found.", HttpStatus.NOT_FOUND);
        }
        return project.get();
    }

    public List<Project> getProjects(Integer userId) {
        return projectRepository.findByUserId(userId);
    }

    public void deleteProjects(Integer id) {
        projectRepository.deleteById(id);
    }

    public Project createProjects(Project project, User user) throws ApiError {
        if (user == null) {
            throw new ApiError("Not able to create project.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        Project newProject = Project.builder()
                .title(project.getTitle())
                .user(user)
                .created(new Date())
                .build();
        projectRepository.save(newProject);
        return newProject;
    }

    public Project updateProjects(Integer projectId, String title) throws ApiError {
        var data = projectRepository.findById(projectId);
        if (data.isEmpty()) {
            throw new ApiError("Project not found.");
        }
        Project existingProject = data.get();
        existingProject.setTitle(title);
        projectRepository.save(existingProject);
        return existingProject;
    }
}
