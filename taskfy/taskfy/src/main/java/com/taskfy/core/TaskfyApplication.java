package com.taskfy.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class TaskfyApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskfyApplication.class, args);
    }

    @RestController
    public static class HelloController {

        @GetMapping("/hello")
        public String hello() {
            return "Hello, Spring Boot!";
        }
    }
}
