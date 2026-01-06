package com.example.garageapiphoto.service;

import com.example.garageapiphoto.repository.PhotoRepository;
import com.example.garagecore.entity.Photo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PhotoService {

    private PhotoRepository photoRepository;

    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    public List<Photo> getAllPhotos() {
        return photoRepository.findAll();
    }

    public Photo getPhotoById(UUID uuidphoto) {
        Optional<Photo> optPhoto = photoRepository.findById(uuidphoto);
        return optPhoto.orElse(null);    }

    public void createPhoto(Photo photo) {
        photoRepository.save(photo);
    }

    public void updatePhoto(Photo photo) throws Exception {
        Photo newPhoto;
        if(photo != null) {
            newPhoto = Photo.builder()
                    .photoId(photo.getPhotoId())
                    .referenceId(photo.getReferenceId())
                    .url(photo.getUrl())
                    .description(photo.getDescription())
                    .datePriseEnCharge(photo.getDatePriseEnCharge())
                    .devis(photo.getDevis())
                    .accord(photo.getAccord())
                    .build();
            photoRepository.save(newPhoto);
        }else{
            throw new Exception("Photo don't exists");
        }
    }

    public void deletePhoto(UUID uuidphoto) {
        photoRepository.deleteById(uuidphoto);
    }
}
