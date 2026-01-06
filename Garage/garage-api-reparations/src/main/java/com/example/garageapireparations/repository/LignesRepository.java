package com.example.garageapireparations.repository;

import com.example.garagecore.entity.LigneReparation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LignesRepository extends JpaRepository<LigneReparation, UUID> {
}
