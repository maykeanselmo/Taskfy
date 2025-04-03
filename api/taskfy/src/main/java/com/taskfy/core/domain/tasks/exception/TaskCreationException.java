package com.taskfy.core.domain.tasks.exception;

public class TaskCreationException extends RuntimeException{
    public TaskCreationException(String message) {
        super(message);
    }
}
