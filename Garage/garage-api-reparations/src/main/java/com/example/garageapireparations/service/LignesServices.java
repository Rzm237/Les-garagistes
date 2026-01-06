package com.example.garageapireparations.service;

import com.example.garageapireparations.repository.DevisRepository;
import com.example.garageapireparations.repository.LignesRepository;
import com.example.garagecore.entity.Devis;
import com.example.garagecore.entity.LigneReparation;
import com.example.garagecore.entity.Vehicule;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LignesServices {
    private LignesRepository lignesRepository;
    private DevisRepository devisRepository;

    public List<LigneReparation> getAllLignes() {
        return lignesRepository.findAll();
    }

    public LigneReparation getLignesById(UUID uuidLignes) {
        Optional<LigneReparation> optLigne = lignesRepository.findById(uuidLignes);
        return optLigne.orElse(null);    }

    public void rattacherDevis(UUID uuidLignes, UUID uuidDevis) throws Exception {
        Optional<LigneReparation> optLigne = lignesRepository.findById(uuidLignes);
        if(optLigne.isPresent()) {
            LigneReparation ligneReparation = optLigne.get();
            Optional<Devis> optionalDevis = devisRepository.findById(uuidDevis);
            optionalDevis.ifPresent(ligneReparation::setDevis);

            lignesRepository.save(ligneReparation);
        }else{
            throw new Exception("Ligne don't exists");
        }
    }

    public void createLignes(LigneReparation lignes) {
        lignesRepository.save(lignes);
    }

    public void updateLignes(LigneReparation lignes) throws Exception {
        LigneReparation newLigne;
        if(lignes != null) {
            newLigne = LigneReparation.builder()
                    .ligneId(lignes.getLigneId())
                    .designation(lignes.getDesignation())
                    .quantite(lignes.getQuantite())
                    .coutUnitaire(lignes.getCoutUnitaire())
                    .type(lignes.getType())
                    .devis(lignes.getDevis())
                    .build();
            lignesRepository.save(newLigne);
        }else{
            throw new Exception("Ligne don't exists");
        }
    }

    public void deleteLignes(UUID uuidLignes) {
        lignesRepository.deleteById(uuidLignes);
    }
}
