package com.taskfy.core.domain.users.model;

public class IncorrectPasswordExcpetion extends RuntimeException{
    public IncorrectPasswordExcpetion(String message) {
        super(message);
    }
}
