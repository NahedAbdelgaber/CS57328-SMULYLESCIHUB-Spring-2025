package com.smu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class ResearcherAnalyticsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ResearcherAnalyticsApplication.class, args);
    }
}
