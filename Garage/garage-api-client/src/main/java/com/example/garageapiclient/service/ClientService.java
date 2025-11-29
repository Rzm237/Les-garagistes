package com.example.garageapiclient.service;

import com.example.garageapiclient.repository.ClientRepository;
import com.example.garagecore.entity.Client;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    private ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }
}
