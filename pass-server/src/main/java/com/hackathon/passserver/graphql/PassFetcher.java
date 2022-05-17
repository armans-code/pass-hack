package com.hackathon.passserver.graphql;

import com.google.firebase.auth.FirebaseToken;
import com.hackathon.passserver.PassCore;
import com.hackathon.passserver.auth.AuthValidator;
import com.hackathon.passserver.graphql.types.*;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsQuery;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@DgsComponent
public class PassFetcher {
    private final PassCore passCore;
    private final AuthValidator authValidator;

    public PassFetcher(PassCore passCore, AuthValidator authValidator) {
        this.passCore = passCore;
        this.authValidator = authValidator;
    }

    @DgsQuery
    public User getUser(@RequestHeader("Authorization") String authorization) {
        FirebaseToken decoded = authValidator.verifyUser(authorization.split("Bearer ")[1]);
        if(decoded.getClaims().get("role").equals("teacher")) {
            return passCore.getTeacher(decoded.getUid());
        } else {
            return passCore.getStudent(decoded.getUid());
        }
    }


    @DgsQuery
    public User getStudent(@RequestHeader("Authorization") String authorization) {
        FirebaseToken decoded = authValidator.verifyUser(authorization.split("Bearer ")[1]);
        return passCore.getStudent(decoded.getUid());
    }

    @DgsQuery
    public User getTeacher(@RequestHeader("Authorization") String authorization) {
        FirebaseToken decoded = authValidator.verifyTeacher(authorization.split("Bearer ")[1]);
        return passCore.getTeacher(decoded.getUid());
    }

    @DgsQuery
    public List<Pass> getPasses(@RequestHeader("Authorization") String authorization) {
        FirebaseToken decoded = authValidator.verifyUser(authorization.split("Bearer ")[1]);
        return passCore.getPasses(decoded.getClaims().get("role").toString(), decoded.getUid());
    }

    @DgsQuery
    public List<Classroom> getClassrooms(@RequestHeader("Authorization") String authorization) {
        FirebaseToken decoded = authValidator.verifyUser(authorization.split("Bearer ")[1]);
        return passCore.getClassrooms(decoded.getClaims().get("role").toString(), decoded.getUid());
    }

}
