package com.taskfy.core.domain.tasks.exception;

public class TagAlreadyAssignedException extends RuntimeException{
    public TagAlreadyAssignedException(String message) {
        super(message);
    }
}
