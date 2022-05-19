package com.hackathon.passserver.converters;

import com.hackathon.passserver.entities.PassType;
import com.hackathon.passserver.entities.*;
import com.hackathon.passserver.graphql.types.*;
import org.springframework.util.ObjectUtils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class Converters {
    public static User convertStudent(StudentEntity studentEntity) {
        User.Builder studentBuilder = User.newBuilder()
                .id(studentEntity.getId().toString())
                .firstName(studentEntity.getFirstName())
                .lastName(studentEntity.getLastName())
                .email(studentEntity.getEmail())
                .phone(studentEntity.getPhone())
                .role(UserRole.STUDENT)
                .createdAt(studentEntity.getCreatedAt().toString());
        if (!ObjectUtils.isEmpty(studentEntity.getUpdatedAt()))
            studentBuilder.updatedAt(studentEntity.getUpdatedAt().toString());
        if (!ObjectUtils.isEmpty(studentEntity.getProfileImage()))
            studentBuilder.profileImage(studentEntity.getProfileImage());
        return studentBuilder.build();
    }

    public static Classroom convertClassroom(ClassroomEntity classroomEntity) {
        Classroom.Builder classroomBuilder = Classroom.newBuilder()
                .id(classroomEntity.getId().toString())
                .name(classroomEntity.getName())
                .teacher(convertTeacher(classroomEntity.getTeacher()))
                .code(classroomEntity.getCode())
                .createdAt(classroomEntity.getCreatedAt().toString());
        if (!ObjectUtils.isEmpty(classroomEntity.getUpdatedAt()))
            classroomBuilder.updatedAt(classroomEntity.getUpdatedAt().toString());
        if (!ObjectUtils.isEmpty(classroomEntity.getDescription()))
            classroomBuilder.description(classroomEntity.getDescription());
        return classroomBuilder.build();
    }

    public static User convertTeacher(TeacherEntity teacherEntity) {
        User.Builder teacherBuilder = User.newBuilder()
                .id(teacherEntity.getId().toString())
                .firstName(teacherEntity.getFirstName())
                .lastName(teacherEntity.getLastName())
                .email(teacherEntity.getEmail())
                .role(UserRole.TEACHER)
                .phone(teacherEntity.getPhone());
        if (!ObjectUtils.isEmpty(teacherEntity.getProfileImage()))
            teacherBuilder.profileImage(teacherEntity.getProfileImage());
        return teacherBuilder.build();
    }

    public static Pass convertPass(PassEntity passEntity) {
        return Pass.newBuilder()
                .id(passEntity.getId().toString())
                .classroom(convertClassroom(passEntity.getClassroom()))
                .teacher(convertTeacher(passEntity.getTeacher()))
                .student(convertStudent(passEntity.getStudent()))
                .startTime(passEntity.getStartTime().toString())
                .endTime(passEntity.getEndTime().toString())
                .passType(passEntity.getPassType().name())
                .revoked(passEntity.getRevoked())
                .build();
    }

    public static StudentEntity buildStudentEntity(RegisterUserInput registerUserInput, String uid) {
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setFirstName(registerUserInput.getFirstName());
        studentEntity.setLastName(registerUserInput.getLastName());
        studentEntity.setAuthId(uid);
        studentEntity.setEmail(registerUserInput.getEmail());
        studentEntity.setPhone(registerUserInput.getPhone());
        if (!ObjectUtils.isEmpty(registerUserInput.getProfileImage()))
            studentEntity.setProfileImage(registerUserInput.getProfileImage());
        return studentEntity;
    }

    public static TeacherEntity buildTeacherEntity(RegisterUserInput registerUserInput, String uid) {
        TeacherEntity teacherEntity = new TeacherEntity();
        teacherEntity.setFirstName(registerUserInput.getFirstName());
        teacherEntity.setLastName(registerUserInput.getLastName());
        teacherEntity.setAuthId(uid);
        teacherEntity.setEmail(registerUserInput.getEmail());
        teacherEntity.setPhone(registerUserInput.getPhone());
        if (!ObjectUtils.isEmpty(registerUserInput.getProfileImage()))
            teacherEntity.setProfileImage(registerUserInput.getProfileImage());
        return teacherEntity;
    }

    public static ClassroomEntity buildClassroomEntity(CreateClassroomInput createClassroomInput, TeacherEntity teacherEntity) {
        ClassroomEntity classroomEntity = new ClassroomEntity();
        classroomEntity.setTeacher(teacherEntity);
        classroomEntity.setName(createClassroomInput.getName());
        if (!ObjectUtils.isEmpty(createClassroomInput.getDescription()))
            classroomEntity.setDescription(createClassroomInput.getDescription());
        return classroomEntity;
    }

    public static PassEntity buildPassEntity(CreatePassInput createPassInput,
                                             TeacherEntity teacherEntity,
                                             ClassroomEntity classroomEntity,
                                             StudentEntity studentEntity) {
        PassEntity passEntity = new PassEntity();
        passEntity.setTeacher(teacherEntity);
        passEntity.setClassroom(classroomEntity);
        passEntity.setStudent(studentEntity);
        passEntity.setPassType(PassType.valueOf(createPassInput.getPassType().name()));
        passEntity.setStartTime(toDate(createPassInput.getStartTime()));
        passEntity.setEndTime(toDate(createPassInput.getEndTime()));
        return passEntity;
    }

    private static Date toDate(String dateInput) {
        try {
            TimeZone tz = TimeZone.getTimeZone("UTC");
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
            df.setTimeZone(tz);
            return df.parse(dateInput);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid Date Format");
        }
    }
}
