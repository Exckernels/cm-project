package backend.community.dto;

import jakarta.validation.constraints.Size;

public record UserUpdaterDto(
        @Size(max = 255) String bio,
        @Size(max = 512) String profilePictureUrl
) {}
