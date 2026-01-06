package com.example.garageapireparations.repository;

import com.example.garagecore.entity.Devis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DevisRepository extends JpaRepository<Devis, UUID> {
}
