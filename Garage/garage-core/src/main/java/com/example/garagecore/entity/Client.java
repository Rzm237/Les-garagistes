package com.example.garagecore.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="Client")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Client {
    @Id
    @Column(name = "IdClient")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID clientId;
    private String nomComplet;
    private String telephone;
    private String adresse;
    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<Vehicule> vehicules = new ArrayList<>();
}
