package com.example.garageapiphoto.controller;

import com.example.garageapiphoto.service.PhotoService;
import com.example.garagecore.entity.Photo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class PhotoController {
 
    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    // Endpoint POST: Pour télécharger des photos du sinistre
    @PostMapping
    public ResponseEntity<Photo> savePhoto(@RequestBody Photo photo) {
        Photo savePhoto = photoService.savePhoto(photo);
        return new ResponseEntity<>(savePhoto, HttpStatus.CREATED); 
    }

}
