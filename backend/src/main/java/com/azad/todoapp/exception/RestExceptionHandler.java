package com.azad.todoapp.exception;

import com.azad.todoapp.utils.CustomResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ApiError.class)
    protected ResponseEntity<CustomResponse<Object>> handleError(ApiError ex) {
        return buildResponseEntity(ex);
    }

    private ResponseEntity<CustomResponse<Object>> buildResponseEntity(ApiError apiError) {
        CustomResponse<Object> customErrorResponse = CustomResponse.builder().message(apiError.getMessage()).build();
        return new ResponseEntity<>(customErrorResponse, apiError.getStatusCode());
    }
}
