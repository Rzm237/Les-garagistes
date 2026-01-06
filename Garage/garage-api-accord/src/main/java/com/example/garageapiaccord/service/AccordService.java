package com.example.garageapiaccord.service;

import com.example.garageapiaccord.repository.AccordRepository;
import com.example.garageapidevis.repository.DevisRepository;
import com.example.garagecore.entity.Accord;
import com.example.garagecore.entity.Client;
import com.example.garagecore.entity.Devis;
import com.example.garagecore.entity.Vehicule;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccordService {

    private AccordRepository accordRepository;
    private DevisRepository devisRepository;

    public AccordService(AccordRepository accordRepository) {
        this.accordRepository = accordRepository;
    }

    public List<Accord> getAccords() {
        return accordRepository.findAll();
    }

    public void createAccord(Accord accord) {
        accordRepository.save(accord);
    }

    public void updateAccord(Accord accord) throws Exception{
        Accord newAccord;
        if(accord != null) {
            newAccord = Accord.builder()
                    .conditions(accord.getConditions())
                    .numero_accord(accord.getNumero_accord())
                    .date_emission(accord.getDate_emission())
                    .numero_accord(accord.getNumero_accord())
                    .devis(accord.getDevis())
                    .montant_valide(accord.getMontant_valide())
                    .statut(accord.getStatut())
                    .photos(accord.getPhotos())
                    .build();
            accordRepository.save(newAccord);
        }else{
            throw new Exception("Accord don't exists");
        }
    }

    public void deleteAccord(UUID uuidAccord) {
        accordRepository.deleteById(uuidAccord);
    }

    public Accord getAccordById(UUID uuidAccord) {
        Optional<Accord> optAccord = accordRepository.findById(uuidAccord);
        return optAccord.orElse(null);
    }

    public void rattacherDevis(UUID uuidAccord, UUID uuidDevis) throws Exception {
        Optional<Accord> optAccord = accordRepository.findById(uuidAccord);
        if(optAccord.isPresent()) {
            Accord accord = optAccord.get();
            Optional<Devis> optionalDevis = devisRepository.findById(uuidDevis);
            optionalDevis.ifPresent(accord::setDevis);

            accordRepository.save(accord);
        }else{
            throw new Exception("Devis don't exists");
        }
    }
}
