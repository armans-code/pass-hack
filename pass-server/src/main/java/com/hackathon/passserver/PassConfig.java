package com.hackathon.passserver;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.hackathon.passserver.notification.NotificationService;
import com.twilio.Twilio;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Configuration
@ComponentScan
public class PassConfig {
    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${firebase.project-id}")
    private String projectId;

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
