package com.hackathon.passserver;

import com.hackathon.passserver.converters.Converters;
import com.hackathon.passserver.entities.ClassroomEntity;
import com.hackathon.passserver.entities.PassEntity;
import com.hackathon.passserver.entities.StudentEntity;
import com.hackathon.passserver.entities.TeacherEntity;
import com.hackathon.passserver.graphql.types.*;
import com.hackathon.passserver.repositories.ClassroomRepository;
import com.hackathon.passserver.repositories.PassRepository;
import com.hackathon.passserver.repositories.StudentRepository;
import com.hackathon.passserver.repositories.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PassCore {
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final PassRepository passRepository;
    private final ClassroomRepository classroomRepository;

    public PassCore(StudentRepository studentRepository, TeacherRepository teacherRepository, PassRepository passRepository, ClassroomRepository classroomRepository) {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.passRepository = passRepository;
        this.classroomRepository = classroomRepository;
    }

    public Student getStudent(String authId) {
        StudentEntity studentEntity = getStudentEntity(authId);
        return Converters.convertStudent(studentEntity);
    }

    public Teacher getTeacher(String authId) {
        TeacherEntity teacherEntity = getTeacherEntity(authId);
        return Converters.convertTeacher(teacherEntity);
    }

    public List<Pass> getPasses(String role, String authId) {
        List<PassEntity> passEntities;
        switch (role) {
            case "student":
                StudentEntity studentEntity = getStudentEntity(authId);
                passEntities = passRepository.getAllByStudentId(studentEntity.getId());
                break;
            case "teacher":
                TeacherEntity teacherEntity = getTeacherEntity(authId);
                passEntities = passRepository.getAllByTeacherId(teacherEntity.getId());
                break;
            default:
                throw new IllegalArgumentException("Invalid Role");
        }
        return passEntities.stream().map(Converters::convertPass).collect(Collectors.toList());
    }

    public Student createStudent(CreateUserInput createUserInput) {
        StudentEntity studentEntity = Converters.buildStudentEntity(createUserInput);
        StudentEntity savedStudent = studentRepository.save(studentEntity);
        return Converters.convertStudent(savedStudent);
    }

    public Teacher createTeacher(CreateUserInput createUserInput) {
        TeacherEntity teacherEntity = Converters.buildTeacherEntity(createUserInput);
        TeacherEntity savedTeacher = teacherRepository.save(teacherEntity);
        return Converters.convertTeacher(savedTeacher);
    }

    public Classroom createClassroom(CreateClassroomInput createClassroomInput, String authId) {
        TeacherEntity teacherEntity = getTeacherEntity(authId);
        ClassroomEntity classroomEntity = Converters.buildClassroomEntity(createClassroomInput, teacherEntity);
        ClassroomEntity savedClassroom = classroomRepository.save(classroomEntity);
        return Converters.convertClassroom(savedClassroom);
    }

    public JoinClassroomOutput joinClassroom(JoinClassroomInput joinClassroomInput, String authId) {
        StudentEntity studentEntity = getStudentEntity(authId);
        ClassroomEntity classroomEntity = classroomRepository.getByCode(joinClassroomInput.getClassCode());
        classroomEntity.getStudents().add(studentEntity);
        return JoinClassroomOutput.newBuilder()
                .status("ADDED")
                .studentId(studentEntity.getId().toString())
                .build();
    }

    public List<Classroom> getClassrooms(String role, String authId) {
        Set<ClassroomEntity> classroomEntities;
        switch (role) {
            case "student":
                StudentEntity studentEntity = getStudentEntity(authId);
                classroomEntities = studentEntity.getClassrooms();
                break;
            case "teacher":
                TeacherEntity teacherEntity = getTeacherEntity(authId);
                classroomEntities = teacherEntity.getClassrooms();
                break;
            default:
                throw new IllegalArgumentException("Invalid Role");
        }
        return classroomEntities.stream().map(Converters::convertClassroom).collect(Collectors.toList());
    }

    private StudentEntity getStudentEntity(String authId) {
        return studentRepository.getByAuthId(authId);
    }

    private TeacherEntity getTeacherEntity(String authId) {
        return teacherRepository.getByAuthId(authId);
    }
}
