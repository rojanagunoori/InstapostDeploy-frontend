import React, { useState, useEffect } from 'react';
import socket from '../../socket/socket'; // Ensure this is a singleton instance

const Chat = ({ currentUser, selectedUser, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (currentUser) {
      socket.emit('join', currentUser.uid); // Join room with user ID
    }

    const handleReceiveMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('receiveMessage', handleReceiveMessage);

    // Cleanup on component unmount
    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [currentUser]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      text: newMessage,
      senderId: currentUser.uid,
      receiverId: selectedUser.id,
      timestamp: new Date(),
    };

    socket.emit('sendMessage', message);
    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage('');
  };

  return (
    <div className="fixed right-0 top-0 w-full lg:w-1/4 h-screen lg:h-4/5 bg-white shadow-lg rounded-lg border border-gray-200 z-20 flex flex-col">
      <button
        onClick={onClose}
        className="text-red-500 p-2 self-end hover:bg-gray-200 rounded-full"
      >
        Close
      </button>
      <h2 className="text-lg font-bold mb-4 p-2 border-b">
        Chat with {selectedUser.name}
      </h2>
      <div className="flex-1 p-2 overflow-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.senderId === currentUser.uid
                ? 'bg-blue-200 self-end text-right'
                : 'bg-gray-200'
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="p-2 border-t bg-gray-100 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-lg mr-2"
          placeholder="Type a message"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
