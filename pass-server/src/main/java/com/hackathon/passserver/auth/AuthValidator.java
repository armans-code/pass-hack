package com.hackathon.passserver.auth;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.stereotype.Component;

@Component
public class AuthValidator {
    private final FirebaseAuth firebaseAuth;

    public AuthValidator(FirebaseAuth firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    public FirebaseToken verifyTeacher(String idToken) {
        try {
            FirebaseToken decodedToken = firebaseAuth.verifyIdToken(idToken);
            if (!decodedToken.getClaims().get("role").equals("teacher"))
                throw new IllegalArgumentException("Invalid Role");
            return decodedToken;
        } catch (FirebaseAuthException e) {
            throw new IllegalArgumentException("Unauthenticated User");
        }
    }

    public FirebaseToken verifyUser(String idToken) {
        try {
            return firebaseAuth.verifyIdToken(idToken);
        } catch (FirebaseAuthException e) {
            throw new IllegalArgumentException("Unauthenticated User");
        }
    }
}
