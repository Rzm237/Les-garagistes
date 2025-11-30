package com.example.garageapidevis.controller;

import com.example.garageapidevis.services.DevisService;
import com.example.garagecore.entity.Devis;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class DevisController {
    private final DevisService devisService;

    public DevisController(DevisService devisService) {
        this.devisService = devisService;
    }

    // Endpoint POST: Pour sauvegarder le devis dans la BD
    @PostMapping
    public ResponseEntity<Devis> sendDevis(@RequestBody Devis devis) {
        Devis savedDevis = devisService.saveDevis(devis);
        return new ResponseEntity<>(savedDevis, HttpStatus.CREATED); 
    }

    // Endpoint GET: Pour récupérer un devis par son ID et l'envoyer à l'assureur
    @GetMapping("/{id}")
    public ResponseEntity<Devis> getUserById(@PathVariable UUID id) {
        return devisService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
