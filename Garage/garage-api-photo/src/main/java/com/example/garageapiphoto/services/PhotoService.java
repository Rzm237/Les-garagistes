package com.example.garageapiphoto.services;

import com.example.garagecore.entity.Photo;
import com.example.garageapiphoto.repositories.PhotoRepository;

public class PhotoService {
    public final PhotoRepository photoRepository;

    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    public Photo savePhoto(Photo nouvellePhoto) {
        return photoRepository.save(nouvellePhoto);
    }
}
