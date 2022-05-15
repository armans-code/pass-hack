package com.hackathon.passserver.repositories;

import com.hackathon.passserver.entities.TeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface TeacherRepository extends JpaRepository<TeacherEntity, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM teacher t WHERE t.auth_id = :authId")
    TeacherEntity getByAuthId(String authId);
}
