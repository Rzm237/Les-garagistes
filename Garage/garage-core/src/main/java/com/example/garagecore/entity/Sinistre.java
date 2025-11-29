package com.example.garagecore.entity;

import com.example.garagecore.enums.StatutSinistre;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="Sinistre")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Sinistre {
    @Id
    @Column(name = "IdSinistre")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID idSinistre;
    private String numeroSinistre;
    private String dateSinistre;
    private String description;
    private StatutSinistre statutSinistre;

    @OneToMany(mappedBy = "sinistre", cascade = CascadeType.ALL)
    private List<Vehicule> vehicules = new ArrayList<>();

    @OneToOne
    private Devis devis;
}
