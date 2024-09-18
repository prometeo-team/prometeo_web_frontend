import { useState, useEffect } from 'react';
import './ComponentChat.css';
import { PiUserCircleBold } from "react-icons/pi";
import { RiMessage3Fill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { getInfoToken } from '../utils/utils';

const ChatComponent = ({ id }) => { // Asegurarte de recibir 'id' como prop
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const obtenerComentarios = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/requestDetail/getRequestComments?id_requestDetail=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`, // Asumiendo que necesitas autenticación
          },
        });
        const result = await response.json();
        if (result.status === '200 OK') {
          const comentarios = result.data.map((comentario, index) => ({
            id: index + 1, 
            text: comentario.body,
            sender: comentario.name_user,
            timestamp: comentario.published_at,
          }));
          setMessages(comentarios);
        }
      } catch (error) {
        console.error("Error al obtener los comentarios:", error);
      }
    };

    obtenerComentarios();
  }, [id]); 

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = async () => {
    const userInfo = getInfoToken(); // Aquí obtienes el nombre del usuario (userInfo.sub)
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: userInfo.sub, // Agrega el nombre del remitente
        timestamp: new Date().toISOString(),
      };
  
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/requestDetail/saveComment?id_requestDetail=${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            id: String(newMessage.id),             
            name_user: userInfo.sub,             
            published_at: newMessage.timestamp,   
            body: newMessage.text                 
          }),
        });
  
        const result = await response.json();
        if (response.ok) {
          setMessages([...messages, newMessage]); 
          setInputMessage('');                    
        } else {
          console.error('Error al enviar el mensaje:', result);
        }
      } catch (error) {
        console.error('Error en la solicitud de envío de comentario:', error);
      }
    }
  };
  

  return (
    <div className="chat-container">
      <div className="mb-4">
        <span className="text-lg md:text-xl lg:text-3xl font-bold">
          <div className="flex items-center">
            <RiMessage3Fill className="mr-4 w-7 h-7 color-icons" />
            Comentarios
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
          </div>
        ))}
      </div>
      <div className="chat-input mt-4 flex items-center">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={inputMessage}
          onChange={handleInputChange}
          className="flex-1 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 hover:border-green-500 border-2"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-transparent hover:bg-green-100 text-green-500 px-3 py-2 rounded-md"
        >
          <IoSend className="send-icon color-icons" />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
