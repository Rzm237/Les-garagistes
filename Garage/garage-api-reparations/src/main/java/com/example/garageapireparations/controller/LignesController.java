package com.example.garageapireparations.controller;

import com.example.garageapireparations.service.LignesServices;
import com.example.garagecore.entity.LigneReparation;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/lignes")
public class LignesController {
    private final LignesServices lignesService;

    public LignesController(LignesServices lignesService) {
        this.lignesService = lignesService;
    }

    @GetMapping
    public List<LigneReparation> getLignes() {
        return lignesService.getAllLignes();
    }

    @GetMapping(path="/{id}")
    public LigneReparation getLignesById(@PathVariable String id) {
        UUID uuidLignes = UUID.fromString(id);
        return lignesService.getLignesById(uuidLignes);
    }

    @PostMapping(path="/rattacherDevis/{idLignes}/{idDevis}")
    public void rattacherDevis(@PathVariable String idLignes, @PathVariable String idDevis) throws Exception {
        UUID uuidLignes = UUID.fromString(idLignes);
        UUID uuidDevis = UUID.fromString(idDevis);

        lignesService.rattacherDevis(uuidLignes,uuidDevis);

    }

    @PostMapping
    private void createLignes(@RequestBody LigneReparation Lignes) {
        lignesService.createLignes(Lignes);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PutMapping
    private void updateLignes(@RequestBody LigneReparation Lignes) throws Exception {
        lignesService.updateLignes(Lignes);
    }

    @DeleteMapping
    public void deleteLignesById(@PathVariable String id) {
        UUID uuidLignes = UUID.fromString(id);
        lignesService.deleteLignes(uuidLignes);
    }
}
