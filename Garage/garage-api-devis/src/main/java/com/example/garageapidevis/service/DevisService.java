package com.example.garageapidevis.service;

import com.example.garageapidevis.repository.DevisRepository;
import com.example.garageapidevis.repository.VehiculeRepository;
import com.example.garagecore.entity.*;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DevisService {
    private DevisRepository devisRepository;
    private VehiculeRepository vehiculeRepository;

    public DevisService(DevisRepository devisRepository) {
        this.devisRepository = devisRepository;
    }

    public List<Devis> getAllDevis() {
        return devisRepository.findAll();
    }

    public Devis getDevisById(UUID uuidDevis) {
        Optional<Devis> optDevis = devisRepository.findById(uuidDevis);
        return optDevis.orElse(null);
    }

    public void createDevis(Devis devis) {
        devisRepository.save(devis);
    }

    public void updateDevis(Devis devis) throws Exception {
        Devis newDevis;
        if(devis != null) {
            newDevis = Devis.builder()
                    .devisId(devis.getDevisId())
                    .notes(devis.getNotes())
                    .numeroSinistre(devis.getNumeroSinistre())
                    .dateCreation(devis.getDateCreation())
                    .montantEstimatif(devis.getMontantEstimatif())
                    .montantPieces(devis.getMontantPieces())
                    .montantMainOeuvre(devis.getMontantMainOeuvre())
                    .assuranceDossierId(devis.getAssuranceDossierId())
                    .vehicule(devis.getVehicule())
                    .reparations(devis.getReparations())
                    .photos(devis.getPhotos())
                    .accords(devis.getAccords())
                    .build();
            devisRepository.save(newDevis);
        }else{
            throw new Exception("Devis don't exists");
        }
    }

    public List<Photo> getPhotosById(UUID uuidDevis) {
        return devisRepository.findById(uuidDevis)
                .map(Devis::getPhotos)
                .orElse(Collections.emptyList());
    }

    public List<Accord> getAccordsById(UUID uuidDevis) {
        return devisRepository.findById(uuidDevis)
                .map(Devis::getAccords)
                .orElse(Collections.emptyList());
    }

    public List<LigneReparation> getLignesById(UUID uuidDevis) {
        return devisRepository.findById(uuidDevis)
                .map(Devis::getReparations)
                .orElse(Collections.emptyList());
    }

    public void deleteDevis(UUID uuidDevis) {
        devisRepository.deleteById(uuidDevis);
    }

    public void rattacherVehicule(UUID uuidDevis, UUID uuidVehicule) throws Exception {
        Optional<Devis> optDevis = devisRepository.findById(uuidDevis);
        if(optDevis.isPresent()) {
            Devis devis = optDevis.get();
            Optional<Vehicule> optionalVehicule = vehiculeRepository.findById(uuidVehicule);
            optionalVehicule.ifPresent(devis::setVehicule);

            devisRepository.save(devis);
        }else{
            throw new Exception("Devis don't exists");
        }
    }
}
