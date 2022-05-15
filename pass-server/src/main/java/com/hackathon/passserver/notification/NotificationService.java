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
//
//    public void createdPass(PhoneNumber phoneNumber, String studentName, PassEntity passEntity) {
//        Twilio.init(accountSid, authToken);
//        Date startDate = passEntity.getStartTime();
//        Date endDate = passEntity.getEndTime();
//
//        long millisecondsDifference = endDate.getTime() - startDate.getTime();
//        long secondsBetween = TimeUnit.MILLISECONDS.convert(millisecondsDifference, TimeUnit.MILLISECONDS);
//
//        System.out.println(secondsBetween);
//
//        Message message = Message.creator(
//                phoneNumber,
//                new PhoneNumber("+15005550006"),
//                "New pass to " + passEntity.getClassroom() + " was created. It ends in " + secondsBetween + "seconds."
//        ).create();
//    }


//    public void classJoinNotification(PhoneNumber phoneNumber, String studentName, String className) {
//        Message message = Message.creator(
//                phoneNumber,
//                new PhoneNumber('our_phonnenumber'),
//                studentName + " has joined your class(" + className + ")."
//        ).create();
//        System.out.println(message.getSid());
//    }
}
