package com.azad.todoapp.controller;

public record SearchRequestTodo(
        Integer projectId,
        String todo
) {
}
