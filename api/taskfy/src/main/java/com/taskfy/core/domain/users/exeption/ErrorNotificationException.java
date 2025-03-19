package com.taskfy.core.domain.users.exeption;

public class ErrorNotificationException  extends RuntimeException{
    public ErrorNotificationException(String message) {
        super(message);
    }
}
