package com.taskfy.core.web.controller;

import com.taskfy.core.domain.users.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1")
public class UsersController {
    private final UsersService usersService;
}
