package org.writer.webadmin.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


 @Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtGenerator tokenGenerator;
    private final JwtUserDetailsService jwtUserDetailsService;

    public JwtAuthenticationFilter(JwtGenerator tokenGenerator, JwtUserDetailsService jwtUserDetailsService) {
        this.tokenGenerator = tokenGenerator;
        this.jwtUserDetailsService = jwtUserDetailsService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, AuthenticationCredentialsNotFoundException {
        String token = getJWTFromRequest(request);
        if (StringUtils.hasText(token) && tokenGenerator.validateToken(token)) {
            String username = tokenGenerator.getEmailFromJWT(token);

            UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails,
                    null, userDetails.getAuthorities());
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
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
