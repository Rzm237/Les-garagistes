package com.example.garageapiclient.controller;


import com.example.garageapiclient.service.ClientService;
import com.example.garagecore.entity.Client;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/clients")
public class clientcontroller {

    private  ClientService service;

    public clientcontroller(ClientService service) {
        this.service = service;
    }

    @GetMapping
    public List<Client> getClients() {
        return service.getAllClients();
    }
}
