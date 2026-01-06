package com.example.garageapiclient.repository;

import com.example.garagecore.entity.Client;
import com.example.garagecore.entity.Vehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client, UUID> {
    Optional<List<Vehicule>> findVehiculesByClientId(UUID clientId);
}
