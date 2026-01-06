package com.example.garageapivehicule.controller;

import com.example.garageapivehicule.service.VehiculeService;
import com.example.garagecore.entity.Accord;
import com.example.garagecore.entity.Vehicule;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping
public class VehiculeController {
    private VehiculeService vehiculeService;

    public VehiculeController(VehiculeService vehiculeService) {
        this.vehiculeService = vehiculeService;
    }

    @GetMapping
    public List<Vehicule> getVehicule() {
        return vehiculeService.getAllVehicule();
    }

    @GetMapping(path="/{id}")
    public Vehicule getvehiculeById(@PathVariable String id) {
        UUID uuidvehicule = UUID.fromString(id);
        return vehiculeService.getVehiculeById(uuidvehicule);
    }

    @PutMapping(path="/rattacherClient/{idvehicule}/{idClient}")
    public void rattacherClient(@PathVariable String idVehicule, @PathVariable String idClient) throws Exception {
        UUID uuidvehicule = UUID.fromString(idVehicule);
        UUID uuidClient = UUID.fromString(idClient);

        vehiculeService.rattacherClient(uuidvehicule,uuidClient);

    }

    @PutMapping(path="/rattacherSinistre/{idvehicule}/{idSinistre}")
    public void rattacherSinistre(@PathVariable String idvehicule, @PathVariable String idSinistre) throws Exception {
        UUID uuidVehicule = UUID.fromString(idvehicule);
        UUID uuidSinistre = UUID.fromString(idSinistre);

        vehiculeService.rattacherSinistre(uuidVehicule,uuidSinistre);

    }

    @GetMapping(path="/accords/{id}")
    public List<Accord> getAccordsByIdvehicule(@PathVariable String id) {
        UUID uuidvehicule = UUID.fromString(id);
        return vehiculeService.getAccordsById(uuidvehicule);
    }

}
