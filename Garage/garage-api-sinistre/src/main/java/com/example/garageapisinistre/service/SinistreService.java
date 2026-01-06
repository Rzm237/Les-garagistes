package com.example.garageapisinistre.service;

import com.example.garageapidevis.repository.DevisRepository;
import com.example.garageapisinistre.repository.SinistreRepository;
import com.example.garagecore.entity.*;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SinistreService {

    private SinistreRepository sinistreRepository;
    private DevisRepository devisRepository;

    public SinistreService(SinistreRepository sinistreRepository) {
        this.sinistreRepository = sinistreRepository;
    }

    public List<Sinistre> getAllSinistre() {
        return sinistreRepository.findAll();
    }

    public Sinistre getSinistreById(UUID uuidSinistre) {
        Optional<Sinistre> optSinistre = sinistreRepository.findById(uuidSinistre);
        return optSinistre.orElse(null);    }

    public void createSinistre(Sinistre sinistre) {
        sinistreRepository.save(sinistre);
    }

    public void updateSinistre(Sinistre sinistre) throws Exception{
        Sinistre newSinistre;
        if(sinistre != null) {
            newSinistre = Sinistre.builder()
                    .idSinistre(sinistre.getIdSinistre())
                    .numeroSinistre(sinistre.getNumeroSinistre())
                    .dateSinistre(sinistre.getDateSinistre())
                    .description(sinistre.getDescription())
                    .statutSinistre(sinistre.getStatutSinistre())
                    .vehicules(sinistre.getVehicules())
                    .devis(sinistre.getDevis())
                    .build();
            sinistreRepository.save(newSinistre);
        }else{
            throw new Exception("Client don't exists");
        }
    }

    public void deleteSinistre(UUID uuidSinistre) {
        sinistreRepository.deleteById(uuidSinistre);
    }

    public List<Vehicule> getVehiculesById(UUID uuidSinistre) {
        return sinistreRepository.findById(uuidSinistre)
                .map(Sinistre::getVehicules)
                .orElse(Collections.emptyList());
    }


    public void rattacherDevis(UUID uuidSinistre, UUID uuidDevis) throws Exception {
        Optional<Sinistre> optSinistre = sinistreRepository.findById(uuidSinistre);
        if(optSinistre.isPresent()) {
            Sinistre sinistre = optSinistre.get();
            Optional<Devis> optionalDevis = devisRepository.findById(uuidDevis);
            optionalDevis.ifPresent(sinistre::setDevis);

            sinistreRepository.save(sinistre);
        }else{
            throw new Exception("Devis don't exists");
        }
    }
}
