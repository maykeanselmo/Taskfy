package com.taskfy.core.domain.users.exeption;

public class IncorrectPasswordExcpetion extends RuntimeException{
    public IncorrectPasswordExcpetion(String message) {
        super(message);
    }
}
