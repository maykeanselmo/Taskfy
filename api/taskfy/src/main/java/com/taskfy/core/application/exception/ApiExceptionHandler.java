package com.taskfy.core.application.exception;

import com.taskfy.core.domain.tasks.exception.FolderNotFoundException;
import com.taskfy.core.domain.users.exeption.UserAlreadyExistsException;
import com.taskfy.core.domain.users.exeption.IncorrectPasswordExcpetion;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage> handleGenericException(Exception e) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorMessage> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex,
                                                                              HttpServletRequest request, BindingResult result) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(HttpStatus.BAD_REQUEST, "Campo(s) inválido(s).", result));
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorMessage> handleUserAlreadyExistsException(RuntimeException ex,
                                                                              HttpServletRequest request) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(HttpStatus.CONFLICT, ex.getMessage()));
    }
    @ExceptionHandler(IncorrectPasswordExcpetion.class)
    public ResponseEntity<ErrorMessage> handIncorrectPasswordExcpetion(IncorrectPasswordExcpetion ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(HttpStatus.BAD_REQUEST, ex.getMessage()));
    }
    @ExceptionHandler(FolderNotFoundException.class)
    public ResponseEntity<ErrorMessage> folderNotFoundExceptionExcpetion(FolderNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ErrorMessage(HttpStatus.BAD_REQUEST, ex.getMessage()));
    }

}
