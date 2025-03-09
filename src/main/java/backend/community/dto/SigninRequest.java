package backend.community.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SigninRequest {
    @NotBlank(message = "Email не должен быть пустым")
    @Email(message = "Некорректный email")
    private String email;

    @NotBlank(message = "Пароль не должен быть пустым")
    private String password;
}
