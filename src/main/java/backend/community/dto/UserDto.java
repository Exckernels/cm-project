package backend.community.dto;

import backend.community.entity.User;

public record UserDto(Long id, String username, String email, String bio, String profilePictureUrl) {
    public static UserDto fromEntity(User user) {
        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), user.getBio(), user.getProfilePictureUrl());
    }
}
