package com.hackathon.passserver.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "student")
@Getter
@Setter
public class StudentEntity extends BaseEntity {
    @Column(name = "auth_id", nullable = false)
    private String authId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phone", nullable = false)
    private String phone;

    @ManyToMany(mappedBy = "students")
    Set<ClassroomEntity> classrooms = new HashSet<>();

    @OneToMany(mappedBy = "student")
    Set<PassEntity> passes = new HashSet<>();
}
