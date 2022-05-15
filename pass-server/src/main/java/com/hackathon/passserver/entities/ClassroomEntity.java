package com.hackathon.passserver.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

@Entity
@Table(name = "classroom")
@Getter
@Setter
public class ClassroomEntity extends BaseEntity {
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "ClassroomEntity_StudentEntity",
            joinColumns = {@JoinColumn(name = "classroom_id")},
            inverseJoinColumns = {@JoinColumn(name = "student_id")}
    )
    Set<StudentEntity> students = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private TeacherEntity teacher;

    @Column(name = "code", nullable = false)
    private String code = String.format("%06d", new Random().nextInt(999999));

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;
}
