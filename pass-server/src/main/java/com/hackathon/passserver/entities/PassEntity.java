package com.hackathon.passserver.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "pass")
@Getter
@Setter
public class PassEntity extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity student;

    @ManyToOne
    @JoinColumn(name = "classroom_id", nullable = false)
    private ClassroomEntity classroom;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private TeacherEntity teacher;

    @Column(name = "pass_type", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private PassType passType;

    @Column(name = "revoked")
    private Boolean revoked = false;

    @Column(name = "start_time")
    private Date startTime;

    @Column(name = "end_time")
    private Date endTime;
}
