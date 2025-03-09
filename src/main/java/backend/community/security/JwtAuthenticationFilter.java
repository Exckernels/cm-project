package backend.community.security;

import io.micrometer.common.lang.Nullable;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
   private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtCore jwtCore;
    private final UserDetailsService userDetailsService;

    @Autowired
    public JwtAuthenticationFilter(JwtCore jwtCore, UserDetailsService userDetailsService) {
        this.jwtCore = jwtCore;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, @Nullable HttpServletResponse response, @Nullable FilterChain filterChain)
            throws ServletException, IOException {
        String username = null;

        try {
            String header = request.getHeader("Authorization");
            if (header != null && header.startsWith("Bearer ")) {
                String jwt = header.substring(7);

                // Валидация токена
                if (jwtCore.validateToken(jwt)) {
                    String email = jwtCore.getUsernameFromToken(jwt); // email из токена
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                    // Создание аутентификации
                    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

                    // Установка в SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }

//        try {
//            String header = request.getHeader("Authorization");
//            if (header != null && header.startsWith("Bearer ")) {
//                jwt = header.substring(7);
//                logger.debug("JWT токен извлечён: {}", jwt);
//
//                if (jwtCore.validateToken(jwt)) {
//                    String email = jwtCore.getUsernameFromToken(jwt);
//                    username = jwtCore.getUsernameFromToken(jwt);
//                    logger.debug("Имя пользователя, извлеченное из токена: {}", username);
//                }
//
//                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//
//                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//
//                    List<SimpleGrantedAuthority> authorities = jwtCore.getAuthoritiesFromToken(jwt);
//
//                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
//                            userDetails,
//                            null,
//                            authorities
//                    );
//
//                    SecurityContextHolder.getContext().setAuthentication(authToken);
//                    logger.debug("Аутентификация, установленная для пользователя: {}", username);
//                }
//            }
        } catch (Exception e) {
            logger.error("Ошибка при обработке JWT токена", e);
            throw new AuthenticationServiceException("Ошибка аутентификации", e);
        }
//        catch (ExpiredJwtException e) {
//            if(response != null){
//                logger.error("Ошибка при обработке JWT токена", e);
//                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Токен истек");
//            }
//            return;
//        } catch (Exception e) {
//            if(response != null) {
//                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Неверный токен");
//            }
//            return;
//        }
        if (filterChain != null && response != null) {
            filterChain.doFilter(request, response);
        } else {
            throw new ServletException("Filter chain, or response is null");
        }
    }
}