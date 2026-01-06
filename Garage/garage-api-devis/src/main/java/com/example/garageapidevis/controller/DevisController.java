package com.example.garageapidevis.controller;

import com.example.garageapidevis.service.DevisService;
import com.example.garagecore.entity.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/devis")
public class DevisController {
    private final DevisService devisService;

    public DevisController(DevisService devisService) {
        this.devisService = devisService;
    }

    @GetMapping
    public List<Devis> getDevis() {
        return devisService.getAllDevis();
    }

    @GetMapping(path="/{id}")
    public Devis getDevisById(@PathVariable String id) {
        UUID uuidDevis = UUID.fromString(id);
        return devisService.getDevisById(uuidDevis);
    }

    @PostMapping(path="/rattacherVehicule/{idDevis}/{idVehicule}")
    public void rattacherVehicule(@PathVariable String idDevis, @PathVariable String idVehicule) throws Exception {
        UUID uuidDevis = UUID.fromString(idDevis);
        UUID uuidVehicule = UUID.fromString(idVehicule);

        devisService.rattacherVehicule(uuidDevis,uuidVehicule);

    }

    @GetMapping(path="/photos/{id}")
    public List<Photo> getPhotosByIdDevis(@PathVariable String id) {
        UUID uuidDevis = UUID.fromString(id);
        return devisService.getPhotosById(uuidDevis);
    }

    @GetMapping(path="/accords/{id}")
    public List<Accord> getAccordsByIdDevis(@PathVariable String id) {
        UUID uuidDevis = UUID.fromString(id);
        return devisService.getAccordsById(uuidDevis);
    }

    @GetMapping(path="/lignes/{id}")
    public List<LigneReparation> getLignesByIdDevis(@PathVariable String id) {
        UUID uuidDevis = UUID.fromString(id);
        return devisService.getLignesById(uuidDevis);
    }

    @PostMapping
    private void createDevis(@RequestBody Devis devis) {
        devisService.createDevis(devis);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PutMapping
    private void updateDevis(@RequestBody Devis devis) throws Exception {
        devisService.updateDevis(devis);
    }

    @DeleteMapping
    public void deleteDevisById(@PathVariable String id) {
        UUID uuidDevis = UUID.fromString(id);
        devisService.deleteDevis(uuidDevis);
    }


}
