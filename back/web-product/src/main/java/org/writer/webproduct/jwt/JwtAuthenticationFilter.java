package org.writer.webproduct.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Set;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtGenerator tokenGenerator;

    public JwtAuthenticationFilter(JwtGenerator tokenGenerator) {
        this.tokenGenerator = tokenGenerator;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, AuthenticationCredentialsNotFoundException {
        String token = getJWTFromRequest(request);
        if (StringUtils.hasText(token) && tokenGenerator.validateToken(token)) {
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(new User("a", "b", Set.of()) {
            },
                    null, Set.of());
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        filterChain.doFilter(request, response);
    }


    private String getJWTFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}
