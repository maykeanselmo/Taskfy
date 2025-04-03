package com.taskfy.core.domain.tasks.exception;

public class FolderNotFoundException extends RuntimeException{
    public FolderNotFoundException(String message) {
        super(message);
    }
}
