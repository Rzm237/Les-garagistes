package com.example.garageapiphoto.repository;

import com.example.garagecore.entity.Photo;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, UUID> {
    
}
