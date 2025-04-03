package com.taskfy.core.domain.tasks.exception;

public class TaskTagNotFoundException extends RuntimeException{
    public TaskTagNotFoundException(String message) {
        super(message);
    }
}
