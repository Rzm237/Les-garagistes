package com.example.garageapidevis.repositories;

import com.example.garagecore.entity.Devis;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// -- Définition du repository pour l'entité Devis qui est récupérer avec son id avec le type UUID --
@Repository
public interface DevisRepository extends JpaRepository<Devis, UUID> {
    
}
