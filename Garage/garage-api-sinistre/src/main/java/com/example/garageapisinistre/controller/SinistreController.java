package com.example.garageapisinistre.controller;

import com.example.garageapisinistre.service.SinistreService;
import com.example.garagecore.entity.Client;
import com.example.garagecore.entity.Sinistre;
import com.example.garagecore.entity.Vehicule;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/sinistre")
public class SinistreController {
    private final SinistreService sinistreService;

    public SinistreController(SinistreService sinistreService) {
        this.sinistreService = sinistreService;
    }

    @GetMapping
    public List<Sinistre> getAllSinistre() {
        return sinistreService.getAllSinistre();
    }

    @GetMapping(path="/{id}")
    public Sinistre getSinistreById(@PathVariable String id) {
        UUID uuidSinistre = UUID.fromString(id);
        return sinistreService.getSinistreById(uuidSinistre);
    }

    @PostMapping
    private void createSinistre(@RequestBody Sinistre sinistre) {
        sinistreService.createSinistre(sinistre);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PutMapping
    private void updateSinistre(@RequestBody Sinistre sinistre) throws Exception {
        sinistreService.updateSinistre(sinistre);
    }

    @DeleteMapping
    public void deleteSinistreById(@PathVariable String id) {
        UUID uuidSinistre = UUID.fromString(id);
        sinistreService.deleteSinistre(uuidSinistre);
    }

    @GetMapping(path="/vehicule/{id}")
    public List<Vehicule> getVehiculesByIdSinistre(@PathVariable String id) {
        UUID uuidSinistre = UUID.fromString(id);
        return sinistreService.getVehiculesById(uuidSinistre);
    }

    @PostMapping(path="/rattacherDevis/{idSinistre}/{idDevis}")
    public void rattacherDevis(@PathVariable String idSinistre, @PathVariable String idDevis) throws Exception {
        UUID uuidSinistre = UUID.fromString(idSinistre);
        UUID uuidDevis = UUID.fromString(idDevis);

        sinistreService.rattacherDevis(uuidSinistre,uuidDevis);

    }
}
