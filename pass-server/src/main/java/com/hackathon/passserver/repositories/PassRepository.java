package com.hackathon.passserver.repositories;

import com.hackathon.passserver.entities.PassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PassRepository extends JpaRepository<PassEntity, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM pass WHERE p.student_id = :studentId")
    List<PassEntity> getAllByStudentId(UUID studentId);

    @Query(nativeQuery = true, value = "SELECT * FROM pass WHERE p.teacher_id = :teacherId")
    List<PassEntity> getAllByTeacherId(UUID teacherId);
}
