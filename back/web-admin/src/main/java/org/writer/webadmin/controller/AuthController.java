package org.writer.webadmin.controller;

import org.writer.webadmin.dto.LoginDto;
import org.writer.webadmin.dto.RegisterDto;
import org.writer.webadmin.exception.ErrorInputDataException;
import org.writer.webadmin.service.impl.AuthServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final AuthServiceImpl authService;


    public AuthController(AuthServiceImpl authService) {
        this.authService = authService;
    }



    @PostMapping("login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginDto loginDto) {
        String jwtToken = authService.login(loginDto);
        return new ResponseEntity<>(jwtToken, HttpStatus.OK);
    }


    @PostMapping("register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDto registerDto) throws ErrorInputDataException {
        authService.register(registerDto);
        return new ResponseEntity<>("User registered success!", HttpStatus.OK);
    }


}
