package com.hackathon.passserver;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.hackathon.passserver.notification.NotificationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
@ComponentScan
public class PassConfig {
    @Value("${twilio.account-sid}")
    String accountSid;

    @Value("${twilio.auth-token}")
    String authToken;

    @Value("${firebase.project-id}")
    String projectId;

    @Bean
    FirebaseApp firebaseApp() throws IOException {
        FileInputStream serviceAccountKey = new FileInputStream("src/main/resources/credentials/masseyServiceAccountKey.json");
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccountKey))
                .setProjectId(projectId)
                .build();
        return FirebaseApp.initializeApp(options);
    }

    @Bean
    FirebaseAuth firebaseAuth() throws IOException {
        return FirebaseAuth.getInstance(firebaseApp());
    }

    @Bean
    NotificationService notificationService() {
        return new NotificationService(accountSid, authToken);
    }
}
