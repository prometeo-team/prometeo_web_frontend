import { useState, useEffect } from 'react';
import './ComponentChat.css';
import { PiUserCircleBold } from "react-icons/pi";
import { RiMessage3Fill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { RiCloseCircleFill } from "react-icons/ri";

// Componente de chat
const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState(null); // Guarda el mensaje al que se está respondiendo
  const [isReplying, setIsReplying] = useState(false); // Estado para controlar si se está respondiendo
  //const [currentUser, setCurrentUser] = useState(null);


  {/*useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://tu-servidor-backend.com/api/user', { //cambiar
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const userData = await response.json();
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    // Llama a la función para obtener la información del usuario al cargar el componente
    fetchUserData();
  }, []);*/}

  const currentUser = 'User1';


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
      setReplyingTo(null);
      setIsReplying(false);
    }
  };


  useEffect(() => {
    // Función para enviar los mensajes al backend (ajusta la URL según tu configuración)
    const sendMessagesToBackend = async () => {
      try {
        const response = await fetch('http://tu-servidor-backend.com/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messages),
        });
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
      } catch (error) {
        console.error('Error al enviar mensajes al backend:', error);
      }
    };

    // Llama a la función de envío al backend cuando cambie el estado de messages
    sendMessagesToBackend();
  }, [messages]);
  return (
    <div className="chat-container ">
      <div className="mb-4">
        <span className="text-lg md:text-xl lg:text-3xl font-bold">
          <div className="flex items-center">
            <RiMessage3Fill className="mr-4 w-7 h-7 color-icons" />
            Conversación
          </div>
        </span>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <div className="message-content flex">
              <PiUserCircleBold className="mr-4 text-xl md:text-2xl lg:text-4xl" />
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
            {replyingTo && replyingTo.id === message.id && isReplying && (
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
                  <IoSend className="send-icon color-icons" />
                </button>
                <button
                  onClick={() => {
                    setReplyingTo(null);
                    setIsReplying(false);
                  }}
                  className="ml-2 bg-transparent hover:bg-gray-100 text-black-500 px-3 py-2 rounded-md"
                >
                  <RiCloseCircleFill className="send-icon w-5 h-5" />
                </button>
              </div>
            )}
            {!replyingTo && (
              <button
                className="button-respo ml-10 bg-transparent hover:bg-green-100 px-3 py-2 rounded-md text-xs font-bold"
                onClick={() => {
                  setReplyingTo(message);
                  setIsReplying(true);
                }}
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
          style={{ display: isReplying ? 'none' : 'block' }}
        />

        <button
          onClick={sendMessage}
          className="ml-2 bg-transparent hover:bg-green-100 text-green-500 px-3 py-2 rounded-md"
          style={{ display: isReplying ? 'none' : 'inline-block' }}
        >
          <IoSend className="send-icon color-icons" />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
