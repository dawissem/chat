package com.teachCode.chat.chat;

import com.teachCode.chat.Enum.MessageType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessage {

    private MessageType type;
    private String content;
    private String sender;
}
