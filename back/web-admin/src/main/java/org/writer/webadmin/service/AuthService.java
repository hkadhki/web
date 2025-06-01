package org.writer.webadmin.service;

import org.writer.webadmin.dto.LoginDto;
import org.writer.webadmin.dto.RegisterDto;
import org.writer.webadmin.exception.ErrorInputDataException;


public interface AuthService {
    String login(LoginDto loginDto);
    void register(RegisterDto registerDto) throws ErrorInputDataException;
}
