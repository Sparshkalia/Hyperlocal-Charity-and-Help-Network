'use client';
import { useState } from 'react';
import ChatSidebar from '@/components/chatfunc/ChatSidebar';
import ChatWindow from '@/components/chatfunc/ChatWindow';


export default function ChatApp() {
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([
    { id: 1, name: 'Ramu', lastMessage: '', time: '' },
    { id: 2, name: 'Shyamu', lastMessage: '', time: '' },
    { id: 3, name: 'Srijan', lastMessage: '', time: '' },
    { id: 4, name: 'Book Club', lastMessage: '', time: '' },
  ]);
  return (
    <div className="flex h-screen">
        <ChatSidebar activeChat={activeChat} setActiveChat={setActiveChat} chats={chats} />
        <ChatWindow activeChat={activeChat} chats={chats} setChats={setChats} />
    </div>
  );
}
