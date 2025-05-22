package backend.community.controller;

import backend.community.entity.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @MessageMapping("/chat.sendMessage")
    @SendTo("/chats")
    public Message sendMessage(
            @Payload Message chatMessage
    ){
        return chatMessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/chats")
    public Message addUser(
            @Payload Message chatMessage,
            SimpMessageHeaderAccessor headerAccessor
    ){
        headerAccessor.getSessionAttributes().put("user", chatMessage.getSender_id());
        return chatMessage;
    }
}
