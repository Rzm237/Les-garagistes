package com.example.garagecore.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name="Photo")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Photo {
    @Id
    @Column(name = "IdPhoto")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID photoId;
    private UUID referenceId;
    private String url;
    private String description;
    private String datePriseEnCharge;
    @ManyToOne
    @JoinColumn(name="IdDevis",nullable=false)
    @JsonIgnore
    private Devis devis;

    @ManyToOne
    @JoinColumn(name="IdAccord",nullable=false)
    @JsonIgnore
    private Accord accord;
}
