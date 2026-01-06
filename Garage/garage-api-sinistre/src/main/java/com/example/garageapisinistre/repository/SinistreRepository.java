package com.example.garageapisinistre.repository;

import com.example.garagecore.entity.Sinistre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SinistreRepository extends JpaRepository<Sinistre, UUID> {
}
