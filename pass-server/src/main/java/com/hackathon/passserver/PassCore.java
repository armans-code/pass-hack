package com.hackathon.passserver;

import com.google.firebase.auth.UserRecord;
import com.hackathon.passserver.auth.AuthService;
import com.hackathon.passserver.converters.Converters;
import com.hackathon.passserver.entities.ClassroomEntity;
import com.hackathon.passserver.entities.PassEntity;
import com.hackathon.passserver.entities.StudentEntity;
import com.hackathon.passserver.entities.TeacherEntity;
import com.hackathon.passserver.graphql.types.*;
import com.hackathon.passserver.notification.NotificationService;
import com.hackathon.passserver.repositories.ClassroomRepository;
import com.hackathon.passserver.repositories.PassRepository;
import com.hackathon.passserver.repositories.StudentRepository;
import com.hackathon.passserver.repositories.TeacherRepository;
import com.twilio.type.PhoneNumber;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PassCore {
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final PassRepository passRepository;
    private final ClassroomRepository classroomRepository;
    private final AuthService authService;
    private final NotificationService notificationService;

    public PassCore(StudentRepository studentRepository, TeacherRepository teacherRepository, PassRepository passRepository, ClassroomRepository classroomRepository, AuthService authService, NotificationService notificationService) {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.passRepository = passRepository;
        this.classroomRepository = classroomRepository;
        this.authService = authService;
        this.notificationService = notificationService;
    }

    public User getUser(String authId, String role) {
        switch(role) {
            case "student":
                StudentEntity studentEntity = getStudentByAuthId(authId);
                return Converters.convertStudent(studentEntity);
            case "teacher":
                TeacherEntity teacherEntity = getTeacherByAuthId(authId);
                return Converters.convertTeacher(teacherEntity);
            default:
                throw new IllegalArgumentException("Invalid Role");
        }
    }

    public List<Pass> getPasses(String role, String authId) {
        List<PassEntity> passEntities;
        switch (role) {
            case "student":
                StudentEntity studentEntity = getStudentByAuthId(authId);
                passEntities = passRepository.getAllByStudentId(studentEntity.getId());
                break;
            case "teacher":
                TeacherEntity teacherEntity = getTeacherByAuthId(authId);
                passEntities = passRepository.getAllByTeacherId(teacherEntity.getId());
                break;
            default:
                throw new IllegalArgumentException("Invalid Role");
        }
        return passEntities.stream().map(Converters::convertPass).collect(Collectors.toList());
    }

    public User registerUser(RegisterUserInput registerUserInput) {
        UserRecord createdUser;
        switch (registerUserInput.getRole()) {
            case STUDENT:
                createdUser = authService.createStudent(registerUserInput);
                StudentEntity studentEntity = Converters.buildStudentEntity(registerUserInput, createdUser.getUid());
                StudentEntity savedStudent = studentRepository.save(studentEntity);
                return Converters.convertStudent(savedStudent);
            case TEACHER:
                createdUser = authService.createTeacher(registerUserInput);
                TeacherEntity teacherEntity = Converters.buildTeacherEntity(registerUserInput, createdUser.getUid());
                TeacherEntity savedTeacher = teacherRepository.save(teacherEntity);
                return Converters.convertTeacher(savedTeacher);
            default:
                throw new IllegalArgumentException("Invalid Role");
        }
    }

    public Classroom createClassroom(CreateClassroomInput createClassroomInput, String authId) {
        TeacherEntity teacherEntity = getTeacherByAuthId(authId);
        ClassroomEntity classroomEntity = Converters.buildClassroomEntity(createClassroomInput, teacherEntity);
        ClassroomEntity savedClassroom = classroomRepository.save(classroomEntity);
        return Converters.convertClassroom(savedClassroom);
    }

    @Transactional
    public JoinClassroomOutput joinClassroom(JoinClassroomInput joinClassroomInput, String authId) {
        StudentEntity studentEntity = getStudentByAuthId(authId);
        ClassroomEntity classroomEntity = classroomRepository.getByCode(joinClassroomInput.getClassCode());
        classroomEntity.getStudents().add(studentEntity);
        notificationService.joinClass(
                new PhoneNumber(classroomEntity.getTeacher().getPhone()),
                studentEntity.getFirstName(),
                classroomEntity.getName()
        );
        return JoinClassroomOutput.newBuilder()
                .status("ADDED")
                .studentId(studentEntity.getId().toString())
                .build();
    }

    @Transactional
    public LeaveClassroomOutput leaveClassroom(LeaveClassroomInput leaveClassroomInput, String authId) {
        StudentEntity studentEntity = getStudentByAuthId(authId);
        ClassroomEntity classroomEntity = classroomRepository.getByCode(leaveClassroomInput.getClassCode());
        classroomEntity.getStudents().remove(studentEntity);
        notificationService.leaveClass(
                new PhoneNumber(classroomEntity.getTeacher().getPhone()),
                studentEntity.getFirstName(),
                classroomEntity.getName()
        );
        return LeaveClassroomOutput.newBuilder()
                .status("REMOVED")
                .studentId(studentEntity.getId().toString())
                .build();
    }

    public List<Classroom> getClassrooms(String role, String authId) {
        List<ClassroomEntity> classroomEntities;
        switch (role) {
            case "student":
                StudentEntity studentEntity = getStudentByAuthId(authId);
                classroomEntities = new ArrayList<>(studentEntity.getClassrooms());
                break;
            case "teacher":
                TeacherEntity teacherEntity = getTeacherByAuthId(authId);
                classroomEntities = classroomRepository.getByTeacherId(teacherEntity.getId());
                break;
            default:
                throw new IllegalArgumentException("Invalid Role");
        }
        return classroomEntities.stream().map(Converters::convertClassroom).collect(Collectors.toList());
    }

    public Pass createPass(CreatePassInput createPassInput, String authId) {
        TeacherEntity teacherEntity = getTeacherByAuthId(authId);
        StudentEntity studentEntity = getStudentById(UUID.fromString(createPassInput.getStudentId()));
        ClassroomEntity classroomEntity = getClassroomById(UUID.fromString(createPassInput.getClassroomId()));
        PassEntity passEntity = Converters.buildPassEntity(createPassInput, teacherEntity, classroomEntity, studentEntity);
        PassEntity savedPassEntity = passRepository.save(passEntity);
        notificationService.createPass(
                new PhoneNumber(studentEntity.getPhone()),
                studentEntity.getFirstName(),
                passEntity
        );
        return Converters.convertPass(savedPassEntity);
    }

    public Pass revokePass(UUID passId) {
        PassEntity passEntity = getPassById(passId);
        passEntity.setRevoked(true);
        PassEntity updatedPass = passRepository.save(passEntity);
        notificationService.revokePass(
                passEntity
        );

        return Converters.convertPass(updatedPass);
    }

    public RequestPassOutput requestPass(CreatePassInput createPassInput) {
        ClassroomEntity classroomEntity = getClassroomById(UUID.fromString(createPassInput.getClassroomId()));
        StudentEntity studentEntity = getStudentById(UUID.fromString(createPassInput.getStudentId()));
        TeacherEntity teacherEntity = classroomEntity.getTeacher();
        String status = notificationService.requestPass(
                new PhoneNumber(teacherEntity.getPhone()),
                studentEntity.getFirstName() + " " + studentEntity.getLastName(),
                createPassInput.getPassType().toString()
        );
        return RequestPassOutput.newBuilder()
                .teacherId(teacherEntity.getId().toString())
                .status(status)
                .build();
    }

    private StudentEntity getStudentByAuthId(String authId) {
        return studentRepository.getByAuthId(authId);
    }

    private TeacherEntity getTeacherByAuthId(String authId) {
        return teacherRepository.getByAuthId(authId);
    }

    private StudentEntity getStudentById(UUID studentId) {
        return studentRepository.getById(studentId);
    }

    private PassEntity getPassById(UUID passId) {
        return passRepository.getById(passId);
    }

    private ClassroomEntity getClassroomById(UUID classroomId) {
        return classroomRepository.getById(classroomId);
    }
}
