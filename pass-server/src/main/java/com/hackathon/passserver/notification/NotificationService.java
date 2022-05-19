package com.hackathon.passserver.notification;

import com.hackathon.passserver.entities.PassEntity;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import java.util.Date;
import java.util.concurrent.TimeUnit;

public class NotificationService {
    private final String accountSid;
    private final String authToken;
    public NotificationService(String accountSid, String authToken) {
        this.accountSid = accountSid;
        this.authToken = authToken;
    }

    public String requestPass(PhoneNumber teacherPhonenumber, String studentName, String location) {
        Twilio.init(accountSid, authToken);
        Message message = Message.creator(
                teacherPhonenumber,
                new PhoneNumber("+15005550006"),
                studentName + " has requested a pass for " + location.toLowerCase() + "."
        ).create();
        return message.getStatus().name();
    }

    public void createPass(PhoneNumber phoneNumber, String studentName, PassEntity passEntity) {
        Twilio.init(accountSid, authToken);
        String passType = passEntity.getPassType().toString().toLowerCase();
        String className = passEntity.getClassroom().getName();
        String time = timeRemaining(passEntity.getStartTime(), passEntity.getEndTime());
        Message message = Message.creator(
                phoneNumber,
                new PhoneNumber("+15005550006"),
                "A " + passType + " pass in " + className + " has been assigned to you. It ends in " + time + " minutes."
        ).create();
    }

    public void revokePass(PassEntity passEntity) {
        Twilio.init(accountSid, authToken);
        String passType = passEntity.getPassType().toString().toLowerCase();
        Message message = Message.creator(
                new PhoneNumber(passEntity.getStudent().getPhone()),
                new PhoneNumber("+15005550006"),
                "Your " + passType + " has been revoked!"
        ).create();
    }

    public void joinClass(PhoneNumber phoneNumber, String studentName, String className) {
        Message message = Message.creator(
                phoneNumber,
                new PhoneNumber("+15005550006"),
                studentName + " has joined " + className + "."
        ).create();
    }

    public void leaveClass(PhoneNumber phoneNumber, String studentName, String className) {
        Message message = Message.creator(
                phoneNumber,
                new PhoneNumber("+15005550006"),
                studentName + " has left " + className + "."
        ).create();
    }

    private String timeRemaining(Date startDate, Date endDate) {
        long millisecondsDifference = endDate.getTime() - startDate.getTime();
        long minutesBetween = TimeUnit.MILLISECONDS.toMinutes(millisecondsDifference);
        long secondsBetween = TimeUnit.MILLISECONDS.toSeconds(millisecondsDifference) % 60;
        return String.format("%02d:%02d", minutesBetween, secondsBetween);
    }
}
