package com.example.garagecore.entity;

import com.example.garagecore.enums.Type;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name="Ligne")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class LigneReparation {
    @Id
    @Column(name = "IdLigne")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID ligneId;
    private String designation;
    private int quantite;
    private int coutUnitaire;
    private Type type;
    @ManyToOne
    @JoinColumn(name="IdDevis",nullable=false)
    @JsonIgnore
    private Devis devis;
}
