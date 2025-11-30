package com.example.garageapidevis.services;

import com.example.garagecore.entity.Devis;

import java.util.Optional;
import java.util.UUID;

import com.example.garageapidevis.repositories.DevisRepository;

public class DevisService {
    public final DevisRepository devisRepository;

    public DevisService(DevisRepository devisRepository) {
        this.devisRepository = devisRepository;
    }

    public Devis saveDevis(Devis nouveauDevis) {
        return devisRepository.save(nouveauDevis);
    }

    public Optional<Devis> findById(UUID id) {
        return devisRepository.findById(id);
    }
}
