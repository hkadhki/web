package org.writer.webadmin.jwt;



import org.writer.webadmin.model.UserEntity;
import org.writer.webadmin.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final UserRepository repository;

    public JwtUserDetailsService(UserRepository repository) {
        this.repository = repository;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = repository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new User(user.getEmail(), user.getPassword(), Set.of());
    }
}
