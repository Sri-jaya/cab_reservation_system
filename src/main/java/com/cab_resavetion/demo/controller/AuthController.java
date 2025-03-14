package com.cab_reservation_system.project.controller;

import com.cab_reservation_system.project.model.User;
import com.cab_reservation_system.project.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // Handle User Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        // Validate the Authorization header
        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            return ResponseEntity.status(400).body("Missing or invalid Authorization header");
        }

        // Decode Basic Authentication Header
        String decodedAuth = new String(Base64.getDecoder().decode(authHeader.substring(6)));
        String[] credentials = decodedAuth.split(":");
        if (credentials.length != 2) {
            return ResponseEntity.status(400).body("Invalid authorization format");
        }

        String username = credentials[0];
        String password = credentials[1];

        // Find user by username
        Optional<User> user = userService.findByUsername(username);

        // Validate credentials
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            // Create a dummy token (For production use JWT)
            String token = "Bearer " + username + "-secure-token";
            return ResponseEntity.ok(Map.of("token", token, "role", user.get().getRole()));
        }

        return ResponseEntity.status(401).body("Invalid username  password");
    }
}
