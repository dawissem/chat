'use strict';


'use strict';
var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null;
var username = null;

var colors: string[] = ['#2196F3', '#32c787', '#00BCD4', '#ff5652', '#ffc107', '#ff85af', '#ff9800', '#39bbb0'];

function connect(event): void {
    username = document.querySelector('#name').value.trim();
    if (username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        var socket: SockJS = new SockJS('/ws');
        stompClient = stomp.over(socket);
        stompClient.connect({}, onConnected, onerror);
    }
    event.preventDefault();

}


function sendMessage(event): void {
    var messagecontent: String = messageInput.value.trim();
    if (messagecontent && stompClient) {
        var chatMessage: {
            sender: username, content: messagecontent.value, type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';

    }
    event.preventDefault();

}

function onMessageReceived(payload): void {
    var message = JSON.parse(payload.body);
    var messageElement: HTMLLIElement = document.createElement('li');
    if (mesage.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + 'joind!';
    } else if
    (message.content = message.sender + 'left!') ;


    else {
        messageElement.classList.add('chat-message');

        var avatarText: Text = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);

        avatarElement.style['background-color'] = getAvatarColor(mesage.sender[0]);
        messageElement.appendChild(avatarElement);

        var usernameElement: HTMLSpanElement = document.createElement('span');
        var usernameText: Text = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement: HTMLParagraphElement = document.createElement('p');
    var messageText: document.createTextNode
    (message.content);
    textElement.appendChild(messageText);
    messageElement.appendChild('textElement');
    messageArea.appendChild(messageElement);
    messageElement.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}function getAvatarColor(messageSender):string{
    var hash:number=0;
    for (var i :number =0; i<messageSender.length;i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index :number =Math.abs('Hash' % colors.length);
    return colors[index];
    }

    usernameForm.addEventListener('submit' , connect , true)
    messageForm.addEventListener('submit', sendMessage, true)

}

    <script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.4/sockjs.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>