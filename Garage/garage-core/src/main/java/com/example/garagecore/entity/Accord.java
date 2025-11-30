package com.example.garagecore.entity;

import com.example.garagecore.enums.StatutAccord;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="Accord")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Accord {
    @Id
    @Column(name = "Idaccord")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID IDaccord;
    private int montant_valide;
    private String conditions;
    private String numero_accord;
    private String date_emission;
    private StatutAccord statut;
    @ManyToOne
    @JoinColumn(name="IdDevis",nullable=false)
    @JsonIgnore
    private Devis devis;

    @OneToMany(mappedBy = "accord", cascade = CascadeType.ALL)
    @Builder.Default
    private List<Photo> photos = new ArrayList<>();
}
