package com.example.garagecore.entity;

import com.example.garagecore.enums.Statut;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="Devis")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Devis {

    // -- Définition des attributs --
    @Id
    @Column(name = "IdDevis")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID devisId;
    private String numeroSinistre;
    private String dateCreation;
    private Statut statut;
    private int montantEstimatif;
    private int montantPieces;
    private int montantMainOeuvre;
    private String assuranceDossierId;
    private String notes;

    // -- Définition des relations avec les classes --
    @ManyToOne
    @JoinColumn(name="vehiculeId",nullable=false)
    @JsonIgnore
    private Vehicule vehicule;

    @OneToMany(mappedBy = "devis", cascade = CascadeType.ALL)
    @Builder.Default
    private List<LigneReparation> reparations = new ArrayList<>();

    @OneToMany(mappedBy = "devis", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Photo> photos = new ArrayList<>();

    @OneToMany(mappedBy = "devis", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Accord> accords = new ArrayList<>();

    // -- Définition du constructeur sans l'id --
    public Devis(String numeroSinistre, String dateCreation, Statut statut, int montantEstimatif, int montantPieces, int montantMainOeuvre, String assuranceDossierId, String notes, Vehicule vehicule) {
        this.numeroSinistre = numeroSinistre;
        this.dateCreation = dateCreation;
        this.statut = statut;
        this.montantEstimatif = montantEstimatif;
        this.montantPieces = montantPieces;
        this.montantMainOeuvre = montantMainOeuvre;
        this.assuranceDossierId = assuranceDossierId;
        this.notes = notes;
        this.vehicule = vehicule;
    }
}
