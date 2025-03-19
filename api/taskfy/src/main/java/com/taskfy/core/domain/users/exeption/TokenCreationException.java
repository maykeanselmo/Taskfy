package com.taskfy.core.domain.users.exeption;

public class TokenCreationException extends RuntimeException{

    public TokenCreationException(String message) {
        super(message);
    }
}
