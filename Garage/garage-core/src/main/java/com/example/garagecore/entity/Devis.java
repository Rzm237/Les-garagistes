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

    @ManyToOne
    @JoinColumn(name="vehiculeId",nullable=false)
    @JsonIgnore
    private Vehicule vehicule;

    @OneToMany(mappedBy = "devis", cascade = CascadeType.ALL)
    private List<LigneReparation> reparations = new ArrayList<>();

    @OneToMany(mappedBy = "devis", cascade = CascadeType.ALL)
    private List<Photo> photos = new ArrayList<>();

    @OneToMany(mappedBy = "devis", cascade = CascadeType.ALL)
    private List<Accord> accords = new ArrayList<>();
}
