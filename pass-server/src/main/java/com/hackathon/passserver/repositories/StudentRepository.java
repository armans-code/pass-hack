package com.hackathon.passserver.repositories;

import com.hackathon.passserver.entities.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM student s WHERE s.auth_id = :authId")
    StudentEntity getByAuthId(String authId);
}
