package com.example.garageapiaccord.controller;

import com.example.garageapiaccord.service.AccordService;
import com.example.garagecore.entity.Accord;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/accords")
public class AccordController {
    private final AccordService accordService;

    public AccordController(AccordService accordService) {
        this.accordService = accordService;
    }

    public List<Accord> getAccords() {
        return accordService.getAccords();
    }

    @GetMapping(path="/{id}")
    public Accord getAccordById(@PathVariable String id) {
        UUID uuidAccord = UUID.fromString(id);
        return accordService.getAccordById(uuidAccord);
    }

    @PostMapping(path="/rattacherDevis/{idAccord}/{idDevis}")
    public void rattacherDevis(@PathVariable String idAccord, @PathVariable String idDevis) throws Exception {
        UUID uuidAccord = UUID.fromString(idAccord);
        UUID uuidDevis = UUID.fromString(idDevis);

        accordService.rattacherDevis(uuidAccord,uuidDevis);

    }

    @PostMapping
    private void createAccord(@RequestBody Accord accord) {
        accordService.createAccord(accord);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PutMapping
    private void updateAccord(@RequestBody Accord accord) throws Exception {
        accordService.updateAccord(accord);
    }

    @DeleteMapping
    public void deleteAccordById(@PathVariable String id) {
        UUID uuidAccord = UUID.fromString(id);
        accordService.deleteAccord(uuidAccord);
    }
}
