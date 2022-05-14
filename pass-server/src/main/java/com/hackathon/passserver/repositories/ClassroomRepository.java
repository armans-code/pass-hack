package com.hackathon.passserver.repositories;

import com.hackathon.passserver.entities.ClassroomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ClassroomRepository extends JpaRepository<ClassroomEntity, UUID> {
    @Query(nativeQuery = true, value = "SELECT c FROM classroom c WHERE c.code = :code")
    ClassroomEntity getByCode(String code);
}
