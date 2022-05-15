package com.hackathon.passserver.repositories;

import com.hackathon.passserver.entities.ClassroomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ClassroomRepository extends JpaRepository<ClassroomEntity, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM classroom c WHERE c.code = :code")
    ClassroomEntity getByCode(String code);

    @Query(nativeQuery = true, value = "SELECT * FROM classroom c WHERE c.teacher_id = :teacherId")
    List<ClassroomEntity> getByTeacherId(UUID teacherId);
}
