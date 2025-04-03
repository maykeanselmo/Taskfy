package com.taskfy.core.application.dto.mapper;

import com.taskfy.core.domain.users.model.Users;
import com.taskfy.core.application.dto.request.UserCreateDto;
import com.taskfy.core.application.dto.response.UserResponseDto;
import org.modelmapper.ModelMapper;

public class UsersMapper {
    public  static UserResponseDto toDto(Users user) {
        return  new ModelMapper().map(user, UserResponseDto.class);
    }

    public static Users toUser(UserCreateDto dto) {
        return new ModelMapper().map(dto, Users.class);
    }
}
