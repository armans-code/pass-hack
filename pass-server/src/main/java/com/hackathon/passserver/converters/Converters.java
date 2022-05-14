package com.hackathon.passserver.converters;

import com.hackathon.passserver.entities.ClassroomEntity;
import com.hackathon.passserver.entities.PassEntity;
import com.hackathon.passserver.entities.PassType;
import com.hackathon.passserver.entities.StudentEntity;
import com.hackathon.passserver.entities.TeacherEntity;
import com.hackathon.passserver.graphql.types.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.stream.Collectors;

public class Converters {
    public static Student convertStudent(StudentEntity studentEntity) {
        return Student.newBuilder()
                .firstName(studentEntity.getFirstName())
                .lastName(studentEntity.getLastName())
                .email(studentEntity.getEmail())
                .phone(studentEntity.getPhone())
                .classrooms(studentEntity.getClassrooms().stream().map(Converters::convertClassroom).collect(Collectors.toList()))
                .createdAt(studentEntity.getCreatedAt().toString())
                .updatedAt(studentEntity.getUpdatedAt().toString())
                .build();
    }

    public static Classroom convertClassroom(ClassroomEntity classroomEntity) {
        return Classroom.newBuilder()
                .id(classroomEntity.getId().toString())
                .name(classroomEntity.getName())
                .teacher(convertTeacher(classroomEntity.getTeacher()))
                .code(classroomEntity.getCode())
                .createdAt(classroomEntity.getCreatedAt().toString())
                .updatedAt(classroomEntity.getUpdatedAt().toString())
                .build();
    }

    public static Teacher convertTeacher(TeacherEntity teacherEntity) {
        return Teacher.newBuilder()
                .id(teacherEntity.getId().toString())
                .firstName(teacherEntity.getFirstName())
                .lastName(teacherEntity.getLastName())
                .classrooms(teacherEntity.getClassrooms().stream().map(Converters::convertClassroom).collect(Collectors.toList()))
                .email(teacherEntity.getEmail())
                .phone(teacherEntity.getPhone())
                .build();
    }

    public static Pass convertPass(PassEntity passEntity) {
        return Pass.newBuilder()
                .id(passEntity.getId().toString())
                .classroom(convertClassroom(passEntity.getClassroom()))
                .teacher(convertTeacher(passEntity.getTeacher()))
                .startTime(passEntity.getStartTime().toString())
                .endTime(passEntity.getEndTime().toString())
                .passType(passEntity.getPassType().name())
                .revoked(passEntity.getRevoked())
                .build();
    }

    public static StudentEntity buildStudentEntity(CreateUserInput createUserInput) {
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setFirstName(createUserInput.getFirstName());
        studentEntity.setLastName(createUserInput.getLastName());
        studentEntity.setAuthId(createUserInput.getAuthId());
        studentEntity.setEmail(createUserInput.getEmail());
        studentEntity.setPhone(createUserInput.getPhone());
        return studentEntity;
    }

    public static TeacherEntity buildTeacherEntity(CreateUserInput createUserInput) {
        TeacherEntity teacherEntity = new TeacherEntity();
        teacherEntity.setFirstName(createUserInput.getFirstName());
        teacherEntity.setLastName(createUserInput.getLastName());
        teacherEntity.setAuthId(createUserInput.getAuthId());
        teacherEntity.setEmail(createUserInput.getEmail());
        teacherEntity.setPhone(createUserInput.getPhone());
        return teacherEntity;
    }

    public static ClassroomEntity buildClassroomEntity(CreateClassroomInput createClassroomInput, TeacherEntity teacherEntity) {
        ClassroomEntity classroomEntity = new ClassroomEntity();
        classroomEntity.setTeacher(teacherEntity);
        classroomEntity.setName(createClassroomInput.getName());
        if (!classroomEntity.getDescription().isEmpty())
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
            return new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").parse(dateInput);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid Date Format");
        }
    }
}
