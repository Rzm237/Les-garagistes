package com.example.garageapivehicule.service;

import com.example.garagecore.entity.Accord;
import com.example.garagecore.entity.Vehicule;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class VehiculeService {
    public List<Vehicule> getAllVehicule() {
    }

    public Vehicule getVehiculeById(UUID uuidvehicule) {
    }

    public void rattacherVehicule(UUID uuidvehicule, String idClient) {
    }

    public List<Accord> getAccordsById(UUID uuidvehicule) {
    }

    public void rattacherSinistre(UUID uuidSinistre, UUID uuidVehicule) {
    }

    public void rattacherClient(UUID uuidvehicule, UUID uuidClient) {
    }
}
