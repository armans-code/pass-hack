package com.hackathon.passserver.graphql;

import com.google.firebase.auth.FirebaseToken;
import com.hackathon.passserver.PassCore;
import com.hackathon.passserver.auth.AuthValidator;
import com.hackathon.passserver.graphql.types.*;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import org.springframework.web.bind.annotation.RequestHeader;

@DgsComponent
public class PassMutation {
    private final PassCore passCore;
    private final AuthValidator authValidator;

    public PassMutation(PassCore passCore, AuthValidator authValidator) {
        this.passCore = passCore;
        this.authValidator = authValidator;
    }

    @DgsMutation
    Student createStudent(CreateUserInput createStudentInput) {
        return passCore.createStudent(createStudentInput);
    }

    @DgsMutation
    Teacher createTeacher(CreateUserInput createTeacherInput) {
        return passCore.createTeacher(createTeacherInput);
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
}
