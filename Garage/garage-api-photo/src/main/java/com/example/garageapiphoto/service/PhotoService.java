package com.example.garageapiphoto.service;

import com.example.garagecore.entity.Photo;
import com.example.garageapiphoto.repository.PhotoRepository;

public class PhotoService {
    public final PhotoRepository photoRepository;

    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    public Photo savePhoto(Photo nouvellePhoto) {
        return photoRepository.save(nouvellePhoto);
    }
}
