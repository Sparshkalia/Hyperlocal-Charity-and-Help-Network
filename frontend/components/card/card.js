'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FiMessageSquare, FiShare } from 'react-icons/fi';
import CardForm from './postform';
import { useRouter } from 'next/navigation';
export default function InstaStyleCard({ postcontent = [] }) {
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "AIIMS New-Delhi",
      time: "1 hour ago",
      titlelogo: "/slogo.png",
      postimg: "/sample.png",
      description: "Urgent need of blood!",
      tags: ["urgent", "delhi", "helpneeded"]
    },
    {
      id: "2",
      title: "City Hospital",
      time: "3 hours ago",
      titlelogo: "/slogo.png",
      postimg: "/sample.png",
      description: "Blood donation drive this weekend",
      tags: ["event", "weekend", "community"]
    },
    {
      id: "3",
      title: "Regional Blood Bank",
      time: "5 hours ago",
      titlelogo: "/slogo.png",
      postimg: "/sample.png",
      description: "O negative blood needed urgently",
      tags: ["urgent", "donation", "lifesaving"]
    }
  ]);

  const addNewPost = (newPost) => {
    const id = (posts.length + 1).toString();
    const timeNow = "Just now";
    setPosts([...posts, { 
      id, 
      time: timeNow,
      ...newPost 
    }]);
  };
  const route=useRouter()
  const handleresponse=()=>{
      route.push('/chatpage')
    }
  const CustomPostCard = ({ post }) => (
    <div className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl mb-6 bg-white dark:bg-gray-800">
      <div className="relative w-full h-64 overflow-hidden"> 
        <Image 
          src={post.postimg} 
          alt={post.description} 
          fill
          style={{ 
            objectFit: 'cover',
            filter: 'none' 
          }}
          className="transition-transform duration-500 hover:scale-105 dark:!filter-none" 
        />
      </div>
      <div className="p-5"> 
        <div className="flex items-center justify-between mb-4"> 
          <div className="flex items-center space-x-3"> 
            <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-600"> 
              <Image 
                src={post.titlelogo} 
                alt={post.title} 
                width={40} 
                height={40} 
                style={{ filter: 'none' }}
                className="object-cover dark:!filter-none" 
              />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">{post.title}</h3> 
              <p className="text-xs text-gray-500 dark:text-gray-400">{post.time}</p>
            </div>
          </div>
          
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 transition-colors hover:bg-purple-200 dark:hover:bg-purple-800" onClick={handleresponse}>
            <FiMessageSquare className="h-4 w-4" /> 
          </button>
        </div>
        <p className="text-base mb-4 text-gray-800 dark:text-gray-200">{post.description}</p> 
        {post.tags && (
          <div className="flex flex-wrap gap-2 mb-4"> 
            {post.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700"> 
          <div className="flex space-x-4">
            <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors">
              <FiShare size={18} /> 
            </button>
          </div>
          
          <button className="flex items-center px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors" onClick={handleresponse}>
            Respond
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Community Posts</h1> 
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
        {posts.map(post => (
          <CustomPostCard key={post.id} post={post} />
        ))}
        {postcontent.map(post => (
          <CustomPostCard 
            key={post.id} 
            post={{
              ...post,
              tags: post.tags || ["community", "donation", "help"]
            }} 
          />
        ))}
      </div>
      <CardForm onSubmit={addNewPost} />
    </div>
  );
}