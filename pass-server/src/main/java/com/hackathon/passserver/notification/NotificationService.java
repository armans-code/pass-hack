package com.hackathon.passserver.notification;

import com.twilio.Twilio;

public class NotificationService {
    public NotificationService(String accountSid, String authToken) {
        Twilio.init(accountSid, authToken);
    }
}
