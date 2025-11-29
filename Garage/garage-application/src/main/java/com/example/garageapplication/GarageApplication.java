package com.example.garageapplication;

import com.example.garagecore.entity.Accord;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.example")
@EntityScan(basePackages = {
        "com.example.garagecore.entity",
        "com.example.garageapiclient.controller",
        "com.example.garageapidevis.controller",
        "com.example.garageapireparations.controller",
        "com.example.garageapisinistre.controller",
        "com.example.garageapivehicule.controller",
        "com.example.garageapiphoto.controller",
        "com.example.garageapiaccord.controller"
})
@EnableJpaRepositories(basePackages = {
        "com.example.garagecore",
        "com.example.garageapiclient",
        "com.example.garageapidevis",
        "com.example.garageapireparations",
        "com.example.garageapisinistre",
        "com.example.garageapivehicule",
        "com.example.garageapiphoto",
        "com.example.garageapiaccord"
})
@ComponentScan(basePackages = {
        "com.example.garageapplication",
        "com.example.garageapiclient",
        "com.example.garageapidevis",
        "com.example.garageapireparations",
        "com.example.garageapisinistre",
        "com.example.garageapivehicule",
        "com.example.garageapiphoto",
        "com.example.garageapiaccord"
})
public class GarageApplication {
    public static void main(String[] args) {
        SpringApplication.run(GarageApplication.class, args);
    }

}
