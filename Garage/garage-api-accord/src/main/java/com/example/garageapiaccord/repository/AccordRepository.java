package com.example.garageapiaccord.repository;

import com.example.garagecore.entity.Accord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AccordRepository extends JpaRepository<Accord, UUID> {
}
