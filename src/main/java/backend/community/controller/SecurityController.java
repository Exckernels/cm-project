package backend.community.controller;

import backend.community.dto.ApiResponse;
import backend.community.dto.SigninRequest;
import backend.community.dto.SignupRequest;
import backend.community.entity.User;
import backend.community.repo.UserRepository;
import backend.community.security.JwtCore;
import backend.community.security.JwtResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class SecurityController {
    private static final Logger log = LoggerFactory.getLogger(SecurityController.class);

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtCore jwtCore;

    @Autowired
    public SecurityController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtCore jwtCore
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtCore = jwtCore;
    }
    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }
    @Autowired
    public void setJwtCore(JwtCore jwtCore) {
        this.jwtCore = jwtCore;
    }
    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        log.info("Запрос на регистрацию: username={}, email={}",
                signupRequest.getUsername(),
                signupRequest.getEmail()
        );

        try {
            // Проверка на null
            if (signupRequest.getUsername() == null || signupRequest.getEmail() == null || signupRequest.getPassword() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Все поля обязательны для заполнения");
            }

            // Проверка уникальности username и email
            if (userRepository.existsByUsername(signupRequest.getUsername())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Выберите другой ник");
            }
            if (userRepository.existsByEmail(signupRequest.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email уже используется");
            }

            // Создание и сохранение пользователя
            User user = new User();
            user.setUsername(signupRequest.getUsername());
            user.setEmail(signupRequest.getEmail());
            user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
            userRepository.save(user);

            // Возврат успешного ответа
            return ResponseEntity.ok(new ApiResponse("Успешная регистрация", true));
        } catch (Exception e) {
            log.error("Ошибка при регистрации: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Ошибка сервера", false));
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SigninRequest signinRequest) {
        // Логирование
        log.info("Запрос на вход: email={}", signinRequest.getEmail());

        try {
            // Проверка на null
            if (signinRequest.getEmail() == null || signinRequest.getPassword() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Все поля обязательны для заполнения");
            }

            // Аутентификация
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signinRequest.getEmail(), signinRequest.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Генерация JWT
            String jwt = jwtCore.generateToken(authentication);
            log.info("Успешный вход: {}", signinRequest.getEmail());

            // Возврат JWT и информации о пользователе
            User user = userRepository.findByEmail(signinRequest.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("Пользователь не найден"));
            return ResponseEntity.ok(new JwtResponse(jwt, user.getUsername(), user.getEmail()));
        } catch (BadCredentialsException e) {
            log.error("Ошибка аутентификации: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("Неверные учетные данные", false));
        } catch (Exception e) {
            log.error("Ошибка при входе: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Ошибка сервера", false));
        }
    }
}
