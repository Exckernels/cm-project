package backend.community.mapper;

import backend.community.dto.UserDto;
import backend.community.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDto userDto(User user){
        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getBio(), user.getProfilePictureUrl());
    }
}
