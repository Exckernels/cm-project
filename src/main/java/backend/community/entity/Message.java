package backend.community.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
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

    @Column(name = "is_read")
    private boolean is_read;
}
