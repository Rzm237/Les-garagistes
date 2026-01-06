package com.example.garageapiclient.controller;


import com.example.garageapiclient.service.ClientService;
//import com.example.garageapiclient.service.serviceClient;
import com.example.garagecore.entity.Client;
import com.example.garagecore.entity.Vehicule;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/clients")
public class clientcontroller {

    private final ClientService serviceClient;

    public clientcontroller(ClientService serviceClient) {
        this.serviceClient = serviceClient;
    }

    @GetMapping
    public List<Client> getClients() {
        return serviceClient.getAllClients();
    }

    @GetMapping(path="/{id}")
    public Client getClientById(@PathVariable String id) {
        UUID uuidClient = UUID.fromString(id);
        return serviceClient.getClientById(uuidClient);
    }

    @GetMapping(path="/vehicule/{id}")
    public List<Vehicule> getVehiculesByIdClient(@PathVariable String id) {
        UUID uuidClient = UUID.fromString(id);
        return serviceClient.getVehiculesById(uuidClient);
    }

    @PostMapping
    private void createClient(@RequestBody Client client) {
        serviceClient.createClient(client);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PutMapping
    private void updateClient(@RequestBody Client client) throws Exception {
        serviceClient.updateClient(client);
    }

    @DeleteMapping
    public void deleteClientById(@PathVariable String id) {
        UUID uuidClient = UUID.fromString(id);
        serviceClient.deleteClient(uuidClient);
    }
}
