import { useState } from 'react';
import { MessageOutlined, UserOutlined, SendOutlined } from '@ant-design/icons';
import './ComponentChat.css';

// Componente de chat
const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState(null); // Guarda el mensaje al que se está respondiendo

  const currentUser = 'User1'; // Nombre del usuario actual, puedes cambiar esto según tu lógica

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleReplyChange = (e) => {
    setReplyMessage(e.target.value);
  };

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: currentUser,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  const sendReply = (messageId) => {
    if (replyMessage.trim() !== '') {
      console.log(`Respuesta para el mensaje con ID ${messageId}: ${replyMessage}`);
      const repliedMessage = messages.find((msg) => msg.id === messageId);
      const newMessage = {
        id: messages.length + 1,
        text: replyMessage,
        sender: currentUser,
        timestamp: new Date().toISOString(),
        repliedTo: repliedMessage, 
      };
      setMessages([...messages, newMessage]);
      setReplyMessage('');
      setReplyingTo(null); // Limpiar el estado de mensaje al que se está respondiendo
    }
  };

  return (
    <div className="chat-container ">
      <div className="mb-4">
        <span className="text-lg md:text-xl lg:text-3xl font-bold">
          <div className="flex items-center">
            <MessageOutlined className="mr-4" />
            Conversación
          </div>
        </span>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <div className="message-content flex">
              <UserOutlined className="mr-4 text-xl md:text-2xl lg:text-4xl" />
              <div>
                <div className="flex items-center">
                  <div className="message-info">
                    <span className="message-sender">{message.sender}</span>
                    <span className="message-timestamp text-xs text-gray-500 ml-2">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <span className="message-text">{message.text}</span>
              </div>
            </div>
            {message.repliedTo && (
              <div className="message-reply ml-12 border-l-2 pl-2"> 
                <span className="text-gray-500 italic">Respuesta:</span>
                <span className="ml-2">{message.repliedTo.text}</span>
              </div>
            )}
            {replyingTo && replyingTo.id === message.id && (
              <div className="chat-input message-reply ml-12 flex items-center">
                <input
                  type="text"
                  placeholder="Responde aquí..."
                  value={replyMessage}
                  onChange={handleReplyChange}
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 hover:border-green-500 border-2"
                />
                <button
                  onClick={() => sendReply(message.id)}
                  className="ml-2 bg-transparent hover:bg-green-100 text-green-500 px-3 py-2 rounded-md"
                >
                  <SendOutlined className="send-icon" />
                </button>
              </div>
            )}
            {!replyingTo && (
              <button
                className="button-respo ml-2 bg-transparent hover:bg-green-100 px-3 py-2 rounded-md"
                onClick={() => setReplyingTo(message)}
              >
                Responder
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="chat-input mt-4 flex items-center">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={inputMessage}
          onChange={handleInputChange}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 hover:border-green-500 border-2"
        />

        <button
          onClick={sendMessage}
          className="ml-2 bg-transparent hover:bg-green-100 text-green-500 px-3 py-2 rounded-md"
        >
          <SendOutlined className="send-icon" />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
