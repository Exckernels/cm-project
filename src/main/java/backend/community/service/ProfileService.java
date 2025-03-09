package backend.community.service;

import backend.community.dto.UserDto;
import backend.community.dto.UserUpdaterDto;
import backend.community.entity.User;
import backend.community.repo.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProfileService {
    private final UserRepository userRepository;

    public ProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Пользователь не найден"));
        return UserDto.fromEntity(user);
    }

    @Transactional
    public UserDto updateUser(String email, UserUpdaterDto userUpdaterDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Пользователь не найден"));

        if(userUpdaterDto.bio() != null){
            user.setBio(userUpdaterDto.bio());
        }
        if(userUpdaterDto.profilePictureUrl() != null){
            user.setProfilePictureUrl(userUpdaterDto.profilePictureUrl());
        }
        return UserDto.fromEntity(user);
    }
    public User getProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
    }
}
