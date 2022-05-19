package com.hackathon.passserver.graphql;

import com.google.firebase.auth.FirebaseToken;
import com.hackathon.passserver.PassCore;
import com.hackathon.passserver.auth.AuthValidator;
import com.hackathon.passserver.graphql.types.*;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.InputArgument;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.UUID;

@DgsComponent
public class PassMutation {
    private final PassCore passCore;
    private final AuthValidator authValidator;

    public PassMutation(PassCore passCore, AuthValidator authValidator) {
        this.passCore = passCore;
        this.authValidator = authValidator;
    }

    @DgsMutation
    public User registerUser(@InputArgument RegisterUserInput registerUserInput) {
        return passCore.registerUser(registerUserInput);
    }

    @DgsMutation
    public Classroom createClassroom(@InputArgument CreateClassroomInput createClassroomInput, @RequestHeader("Authorization") String authorization) {
        FirebaseToken firebaseToken = authValidator.verifyTeacher(authorization.split("Bearer ")[1]);
        return passCore.createClassroom(createClassroomInput, firebaseToken.getUid());
    }

    @DgsMutation
    public JoinClassroomOutput joinClassroom(@InputArgument JoinClassroomInput joinClassroomInput, @RequestHeader("Authorization") String authorization) {
        FirebaseToken firebaseToken = authValidator.verifyUser(authorization.split("Bearer ")[1]);
        return passCore.joinClassroom(joinClassroomInput, firebaseToken.getUid());
    }

    @DgsMutation
    public LeaveClassroomOutput leaveClassroom(@InputArgument LeaveClassroomInput leaveClassroomInput, @RequestHeader("Authorization") String authorization) {
        FirebaseToken firebaseToken = authValidator.verifyUser(authorization.split("Bearer ")[1]);
        return passCore.leaveClassroom(leaveClassroomInput, firebaseToken.getUid());
    }

    @DgsMutation
    public Pass createPass(@InputArgument CreatePassInput createPassInput, @RequestHeader("Authorization") String authorization) {
        FirebaseToken firebaseToken = authValidator.verifyTeacher(authorization.split("Bearer ")[1]);
        return passCore.createPass(createPassInput, firebaseToken.getUid());
    }

    @DgsMutation
    public Pass revokePass(@InputArgument String passId, @RequestHeader("Authorization") String authorization) {
        FirebaseToken firebaseToken = authValidator.verifyTeacher(authorization.split("Bearer ")[1]);
        return passCore.revokePass(UUID.fromString(passId));
    }

    @DgsMutation
    public RequestPassOutput requestPass(@InputArgument CreatePassInput requestPassInput) {
        return passCore.requestPass(requestPassInput);
    }

}
