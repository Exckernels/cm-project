package backend.community.entity;

import backend.community.enums.MessageType;
import jakarta.persistence.*;
import lombok.*;

import java.awt.*;

@Entity
@Table(name="messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column(name = "chat_id")
    private Long chat_id;

    @Column(name = "sender_id")
    private Long sender_id;

    @Column(name = "text")
    private String text;

    private MessageType type;

    @Column(name = "is_read")
    private boolean is_read;
}
