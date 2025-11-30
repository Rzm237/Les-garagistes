package com.example.garagecore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="Vehicule")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Vehicule {
    @Id
    @Column(name = "IdVehicule")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID vehiculeId;
    private String immatriculation;
    private String marque;
    private String modele;
    private int annee;

    @ManyToOne
    @JoinColumn(name="clientId",nullable=false)
    @JsonIgnore
    private Client client;

    @ManyToOne
    @JoinColumn(name="sinistreId",nullable=false)
    @JsonIgnore
    private Sinistre sinistre;

    @OneToMany(mappedBy = "vehicule", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Devis> devisList = new ArrayList<>();
}
