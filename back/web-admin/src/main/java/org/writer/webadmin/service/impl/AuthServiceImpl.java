package org.writer.webadmin.service.impl;

import org.springframework.security.core.userdetails.User;
import org.writer.webadmin.dto.LoginDto;
import org.writer.webadmin.dto.RegisterDto;
import org.writer.webadmin.exception.ErrorInputDataException;
import org.writer.webadmin.jwt.JwtGenerator;
import org.writer.webadmin.model.UserEntity;
import org.writer.webadmin.repository.UserRepository;
import org.writer.webadmin.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;



@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtGenerator jwtGenerator;
    private final PasswordEncoder passwordEncoder;


    public AuthServiceImpl(UserRepository userRepository,  AuthenticationManager authenticationManager, JwtGenerator jwtGenerator,  PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtGenerator = jwtGenerator;
    }



    public String login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtGenerator.generateToken(authentication);
    }




    @Transactional
    public void register(RegisterDto registerDto) throws ErrorInputDataException {
        if(userRepository.existsByEmail(registerDto.getEmail())){
            log.error("Email {} is already in use", registerDto.getEmail());
            throw new ErrorInputDataException("Email " + registerDto.getEmail() + " is already in use");
        }

        registerDto.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        UserEntity userEntity = new UserEntity(null, registerDto.getEmail(), registerDto.getPassword());

        userRepository.save(userEntity);
    }
}

