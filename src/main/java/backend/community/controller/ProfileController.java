package backend.community.controller;

import backend.community.dto.UserDto;
import backend.community.dto.UserUpdaterDto;
import backend.community.entity.User;
import backend.community.security.UserDetailsImpl;
import backend.community.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/me")
    public ResponseEntity<User> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = profileService.getProfile(email);
        return ResponseEntity.ok(user);
    }


    @PutMapping("/me")
    public ResponseEntity<UserDto> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UserUpdaterDto userUpdaterDto){
        String email = ((UserDetailsImpl) userDetails).getEmail();
        UserDto updatedUser = profileService.updateUser(email, userUpdaterDto);

        return ResponseEntity.ok(updatedUser);
    }
}
