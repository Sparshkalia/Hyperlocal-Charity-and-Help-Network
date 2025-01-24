'use client';
import { useRouter } from 'next/navigation';
export default function ChatSidebar({ activeChat, setActiveChat, chats }) {
    const route=useRouter()
  const handleback=(e)=>{
    e.preventDefault()
    route.push('/mainWeb')
  }
    return (
      <div className="w-1/3 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 text-xl font-bold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
        <button onClick={handleback} className='pr-44 hover:text-blue-500'>Back</button>
          Chats
        </div>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`flex justify-between items-center p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${
                activeChat?.id === chat.id ? 'bg-gray-200 dark:bg-gray-700' : ''
              }`}
            >
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{chat.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{chat.lastMessage}</p>
              </div>
              <div className="text-xs text-gray-500">{chat.time}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  