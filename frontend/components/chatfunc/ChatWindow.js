'use client';
import { useState } from 'react';

export default function ChatWindow({ activeChat, chats, setChats }) {
  const [chatMessages, setChatMessages] = useState({}); 
  const [newMessage, setNewMessage] = useState(''); 

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }
  const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true, 
    };
    return now.toLocaleString('en-US', options); 
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;// this trim restrict to send empty message

    const updatedMessages = {
      ...chatMessages,
      [activeChat.id]: [
        ...(chatMessages[activeChat.id] || []),
        { id: Date.now(), text: newMessage, sender: 'You' },//udate here i have used random id for message
      ],
    };

    setChatMessages(updatedMessages);
    setNewMessage('');

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChat.id
          ? { ...chat, lastMessage: newMessage ,time:getCurrentDateTime()}//this function will update the last message and add the time when the last msg was send in chat at the sidebar
          : chat
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">{activeChat.name}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-900">
        {chatMessages[activeChat.id]?.length > 0 ? (
          <ul>
            {chatMessages[activeChat.id].map((message) => (
              <li
                key={message.id}
                className={`mb-2 p-2 rounded-md ${
                  message.sender === 'You'
                    ? 'bg-blue-100 dark:bg-blue-800 text-right'
                    : 'bg-gray-100 dark:bg-gray-700 text-left'
                }`}
              >
                <p className="text-sm text-gray-800 dark:text-gray-200">{message.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 dark:text-gray-400">No messages yet...</div>
        )}
      </div>
      <div className="p-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
