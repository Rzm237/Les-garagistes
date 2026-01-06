package com.example.garageapiphoto.controller;

import com.example.garageapiphoto.service.PhotoService;
import com.example.garagecore.entity.Photo;
import com.example.garagecore.entity.Vehicule;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/photo")
public class PhotoController {
    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }


    @GetMapping
    public List<Photo> getphotos() {
        return photoService.getAllPhotos();
    }

    @GetMapping(path="/{id}")
    public Photo getphotoById(@PathVariable String id) {
        UUID uuidphoto = UUID.fromString(id);
        return photoService.getPhotoById(uuidphoto);
    }


    @PostMapping
    private void createphoto(@RequestBody Photo photo) {
        photoService.createPhoto(photo);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PutMapping
    private void updatephoto(@RequestBody Photo photo) throws Exception {
        photoService.updatePhoto(photo);
    }

    @DeleteMapping
    public void deletephotoById(@PathVariable String id) {
        UUID uuidphoto = UUID.fromString(id);
        photoService.deletePhoto(uuidphoto);
    }
}
