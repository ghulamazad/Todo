package com.azad.todoapp.utils;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomResponse<T> {
    private boolean isSuccess;
    private T data;
    private String message;

    public static <T> CustomResponse<T> create(boolean isSuccess, T data, String message) {
        return CustomResponse.<T>builder()
                .isSuccess(isSuccess)
                .data(data)
                .message(message)
                .build();
    }

    public static <T> CustomResponse<T> getSuccess(T data) {
        return CustomResponse.<T>builder()
                .isSuccess(true)
                .data(data)
                .message("SUCCESS")
                .build();
    }
}

