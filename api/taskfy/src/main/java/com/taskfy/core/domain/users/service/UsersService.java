package com.taskfy.core.domain.users.service;


import com.taskfy.core.domain.users.exeption.UserAlreadyExistsException;
import com.taskfy.core.domain.users.exeption.IncorrectPasswordExcpetion;
import com.taskfy.core.domain.users.model.Users;
import com.taskfy.core.domain.users.repository.UsersRepository;
import com.taskfy.core.application.dto.request.UpdatePasswordDto;
import com.taskfy.core.application.dto.request.UpdateUserDto;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class UsersService {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Users createUser(Users user){

        try{
            String encryptedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encryptedPassword);
            return usersRepository.save(user);
        } catch (DataIntegrityViolationException e){
            throw new UserAlreadyExistsException("Já existe usuário cadastrado com esse email ou username");
        } catch (Exception e){
            throw  new RuntimeException("Erro ao criar usuário. Tente novamente mais tarde.");
        }
    }

    @Transactional
    public Users getUserById(Long id) {
        return usersRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Nenhum usuário foi encontrado com este id: " + id)
        );
    }

    @Transactional
    public Users updateUser(Long id, UpdateUserDto dto){
        Users existingUser =getUserById(id);

        existingUser.setEmail(dto.getEmail());
        existingUser.setUsername(dto.getUsername());
        existingUser.setNickname(dto.getNickname());
        return usersRepository.save(existingUser);
    }

    @Transactional
    public Page<Users> getAllUsersPaginated(int page, int size, String sortBy, String direction) {

        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));
        return (Page<Users>) usersRepository.findAll(pageable);
    }
    public Users updatePassword(Long id, UpdatePasswordDto updatePasswordDto) {
        Users existingUser = getUserById(id);
        if (passwordEncoder.matches(updatePasswordDto.getCurrentPassword(), existingUser.getPassword())) {
            String encryptedPassword = passwordEncoder.encode(updatePasswordDto.getNewPassword());
            existingUser.setPassword(encryptedPassword);
            return usersRepository.save(existingUser);
        } else
            throw new IncorrectPasswordExcpetion("Senha incorreta");
    }
    @Transactional
    public Users getUserByEmail(String email) {

        Users user= (Users) usersRepository.findByEmail(email);
        if(user == null){
            throw new EntityNotFoundException("Nenhum usuário foi encontrado com o e-mail: " + email);
        }
        else{
            return user;
        }

    }

    // Ao invés de remover do campo, apenas muda o status da conta. Para fins de preservação de histórico
    @Transactional
    public Users deleteUser(Long id) {
        Users existingUser = getUserById(id);
        existingUser.setActive(false);
        return usersRepository.save(existingUser);
    }

}
