package com.taskfy.core.domain.users.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.taskfy.core.domain.users.exeption.ErrorNotificationException;
import com.taskfy.core.domain.users.exeption.UserAlreadyExistsException;
import com.taskfy.core.domain.users.model.Users;
import com.taskfy.core.domain.users.repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsersService {
    private final UsersRepository usersRepository;

    @Transactional
    public Users createUser(Users user){
        try{
            return usersRepository.save(user);
        } catch (DataIntegrityViolationException e){
            throw new UserAlreadyExistsException("Já existe usuário cadastrado com esse email ou username");
        } catch (Exception e){
            throw  new RuntimeException("Erro ao criar usuário. Tente novamente mais tarde.");
        }

    }

}
