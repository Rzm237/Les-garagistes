package com.example.garageapiclient.service;

import com.example.garageapiclient.repository.ClientRepository;
import com.example.garagecore.entity.Client;
import com.example.garagecore.entity.Vehicule;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClientService {

    private ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public void createClient(Client client) {
        clientRepository.save(client);
    }

    public Client getClientById(UUID id) {
        Optional<Client> optClient = clientRepository.findById(id);
        return optClient.orElse(null);
    }

//    public Client getClientVehiculeId(UUID id) {
//        Optional<Client> optClient = clientRepository.findById(id);
//        return optClient.orElse(null);
//    }

    public void updateClient(Client client) throws Exception {
        Client newClient;
        if(client != null) {
            newClient = Client.builder()
                    .clientId(client.getClientId())
                    .adresse(client.getAdresse())
                    .telephone(client.getTelephone())
                    .nomComplet(client.getNomComplet())
                    .build();
            clientRepository.save(newClient);
        }else{
            throw new Exception("Client don't exists");
        }
    }

    public void deleteClient(UUID uuidClient) {
        clientRepository.deleteById(uuidClient);
    }

    public List<Vehicule> getVehiculesById(UUID uuidClient) {
        return clientRepository.findById(uuidClient)
                .map(Client::getVehicules)
                .orElse(Collections.emptyList());
    }
}
