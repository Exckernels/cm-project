package backend.community.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class SignupRequest {
    @NotBlank(message = "Username не должен быть пустым")
    private String username;

    @NotBlank(message = "Email не должен быть пустым")
    @Email(message = "Некорректный email")
    private String email;

    @NotBlank(message = "Пароль не должен быть пустым")
    private String password;
}
