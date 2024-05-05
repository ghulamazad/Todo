package com.azad.todoapp.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiError extends Exception {
    private final String message;
    private final HttpStatus statusCode;

    public ApiError(String message, HttpStatus statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }

    public ApiError(String message) {
        super(message);
        this.message = message;
        this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }
}

