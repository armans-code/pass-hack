package com.hackathon.passserver.graphql;

import com.google.firebase.auth.FirebaseToken;
import com.hackathon.passserver.PassCore;
import com.hackathon.passserver.auth.AuthValidator;
import com.hackathon.passserver.graphql.types.*;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
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
    Student createStudent(RegisterUserInput registerStudentInput) {
        return passCore.registerStudent(registerStudentInput);
    }

    @DgsMutation
    Teacher createTeacher(RegisterUserInput registerTeacherInput) {
        return passCore.registerTeacher(registerTeacherInput);
    }

    @DgsMutation
    Classroom createClassroom(CreateClassroomInput createClassroomInput, @RequestHeader("authorization") String authorization) {
        FirebaseToken firebaseToken = authValidator.verifyTeacher(authorization);
        return passCore.createClassroom(createClassroomInput, firebaseToken.getUid());
    }

    @DgsMutation
    JoinClassroomOutput joinClassroom(JoinClassroomInput joinClassroomInput, @RequestHeader("authorization") String authorization) {
        FirebaseToken firebaseToken = authValidator.verifyUser(authorization);
        return passCore.joinClassroom(joinClassroomInput, firebaseToken.getUid());
    }

    @DgsMutation
    Pass createPass(CreatePassInput createPassInput, @RequestHeader("authorization") String authorization) {
        FirebaseToken firebaseToken = authValidator.verifyTeacher(authorization);
        return passCore.createPass(createPassInput, firebaseToken.getUid());
    }

    @DgsMutation
    Pass revokePass(String passId, @RequestHeader("authorization") String authorization) {
        FirebaseToken firebaseToken = authValidator.verifyTeacher(authorization);
        return passCore.revokePass(UUID.fromString(passId));
    }

}
