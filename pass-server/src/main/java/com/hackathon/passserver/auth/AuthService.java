package com.hackathon.passserver.auth;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.hackathon.passserver.graphql.types.RegisterUserInput;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import java.util.Map;

@Component
public class AuthService {
    private final FirebaseAuth firebaseAuth;

    public AuthService(FirebaseAuth firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    public UserRecord createStudent(RegisterUserInput registerUserInput) {
        try {
            UserRecord.CreateRequest createRequest = buildCreateRequest(registerUserInput);
            UserRecord userRecord = firebaseAuth.createUser(createRequest);
            firebaseAuth.setCustomUserClaims(userRecord.getUid(), Map.of("role", "student"));
            return userRecord;
        } catch (FirebaseAuthException e) {
            throw new IllegalArgumentException(e);
        }
    }

    public UserRecord createTeacher(RegisterUserInput registerUserInput) {
        try {
            UserRecord.CreateRequest createRequest = buildCreateRequest(registerUserInput);
            UserRecord userRecord = firebaseAuth.createUser(createRequest);
            firebaseAuth.setCustomUserClaims(userRecord.getUid(), Map.of("role", "teacher"));
            return userRecord;
        } catch (FirebaseAuthException e) {
            throw new IllegalArgumentException(e);
        }
    }

    private UserRecord.CreateRequest buildCreateRequest(RegisterUserInput registerUserInput) {
        UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest();
        createRequest.setEmail(registerUserInput.getEmail());
        createRequest.setPhoneNumber(registerUserInput.getPhone());
        createRequest.setPassword(registerUserInput.getPassword());
        if (!ObjectUtils.isEmpty(registerUserInput.getProfileImage()))
            createRequest.setPhotoUrl(registerUserInput.getProfileImage());
        return createRequest;
    }
}
