"use client";
import InstaStyleCard from "@/components/card/card";
import { Postprovider } from "@/components/card/postcomponents";
import Usericon from "@/components/userprofile/icon";
import { useState, useEffect } from "react";
import { SunIcon, MoonIcon, HeartIcon, MessageSquareIcon, ShareIcon, BookmarkIcon, PlusCircleIcon, BellIcon, SearchIcon, CompassIcon, UserIcon } from "lucide-react";

function Hucn() {
  const [postcontent, setPostcontent] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("global");

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Sample posts for display
  const samplePosts = [
    {
      id: "1",
      title: "AIIMS New-Delhi",
      time: "1 hour ago",
      titlelogo: "/slogo.png",
      postimg: "/sample.png",
      description: "Urgent need of blood!",
      category: "Emergency",
      bloodType: "O-",
      tags: ["urgent", "delhi", "helpneeded"]
    },
    {
      id: "2",
      title: "City Hospital",
      time: "3 hours ago",
      titlelogo: "/slogo.png",
      postimg: "/sample.png",
      description: "Blood donation drive this weekend",
      category: "Event",
      bloodType: "All Types",
      tags: ["event", "weekend", "community"]
    },
    {
      id: "3",
      title: "Regional Blood Bank",
      time: "5 hours ago",
      titlelogo: "/slogo.png",
      postimg: "/sample.png",
      description: "O negative blood needed urgently",
      category: "Emergency",
      bloodType: "O-",
      tags: ["urgent", "donation", "lifesaving"]
    }
  ];

  // Custom Styled Post Card
  const CustomPostCard = ({ post }) => (
    <div className={`relative overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Category Badge */}
      <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-sm font-semibold ${
        post.category === "Emergency" 
          ? "bg-red-500 text-white" 
          : post.category === "Event"
          ? "bg-blue-500 text-white"
          : "bg-green-500 text-white"
      }`}>
        {post.category}
      </div>
      
      {/* Post Image */}
      <div className="relative w-full h-64 overflow-hidden">
        <img 
          src={post.postimg} 
          alt={post.description} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
        
        {/* Blood Type Overlay */}
        {post.bloodType && (
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 px-3 py-2 rounded-lg text-lg font-bold text-red-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            {post.bloodType}
          </div>
        )}
      </div>
      
      {/* Post Content */}
      <div className="p-5">
        {/* Author & Time */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-600">
              <img 
                src={post.titlelogo} 
                alt={post.title} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">{post.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{post.time}</p>
            </div>
          </div>
          
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 transition-colors hover:bg-purple-200 dark:hover:bg-purple-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
        
        {/* Description */}
        <p className="text-gray-800 dark:text-gray-200 text-lg mb-4">{post.description}</p>
        
        {/* Tags */}
        {post.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors">
              <HeartIcon size={20} />
              <span>23</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <MessageSquareIcon size={20} />
              <span>4</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition-colors">
              <ShareIcon size={20} />
            </button>
          </div>
          
          <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            <span>Respond</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Tab options
  const tabs = [
    { id: "global", label: "Global" },
    { id: "local", label: "Local" },
    { id: "following", label: "Following" },
    { id: "urgent", label: "Urgent" }
  ];

  return (
    <Postprovider value={{ postcontent }}>
      <div className={`${darkMode ? "dark" : ""} min-h-screen transition-colors duration-300`}>
        {/* Gradient Background */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 -z-10"></div>
        
        {/* Header with search bar */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                  <h1 className="text-xl font-black text-white">H</h1>
                </div>
                <h1 className="ml-2 text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                  HUCN
                </h1>
              </div>
              
              {/* Search Bar */}
              <div className="hidden md:flex items-center max-w-md w-full mx-6 relative">
                <input 
                  type="text" 
                  placeholder="Search posts, users, or blood types..." 
                  className="w-full py-2 px-4 pr-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-purple-500"
                />
                <SearchIcon className="absolute right-3 text-gray-500 dark:text-gray-400" size={18} />
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                  <BellIcon size={22} className="text-gray-700 dark:text-gray-300" />
                  <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {darkMode ? 
                    <SunIcon size={22} className="text-yellow-500" /> : 
                    <MoonIcon size={22} className="text-gray-700" />
                  }
                </button>
                <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-purple-500">
                  <Usericon />
                </div>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex items-center space-x-1 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap
                    ${activeTab === tab.id 
                      ? "bg-purple-600 text-white" 
                      : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          {/* Create Post Button */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 flex items-center space-x-4 mb-6">
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-purple-500">
              <Usericon />
            </div>
            <button className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-4 text-left text-gray-500 dark:text-gray-400">
              Create a new post...
            </button>
            <button className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors">
              <PlusCircleIcon size={24} />
            </button>
          </div>
          
          {/* Featured Post - Larger */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-900 rounded-2xl overflow-hidden shadow-lg mb-8">
            <div className="p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Featured Post</h2>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                  Important
                </span>
              </div>
              <p className="text-lg mb-4">
                World Blood Donor Day is coming up on June 14th. Join us in our global campaign to raise awareness about the importance of blood donation!
              </p>
              <button className="px-4 py-2 bg-white text-purple-700 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Posts Feed */}
          <div className="space-y-6">
            {samplePosts.map(post => (
              <CustomPostCard key={post.id} post={post} />
            ))}
            {postcontent.map(post => (
              <CustomPostCard 
                key={post.id} 
                post={{
                  ...post,
                  category: post.description.includes("Urgent") ? "Emergency" : "General",
                  bloodType: post.description.includes("blood") ? "Various" : null,
                  tags: ["community", "donation", "help"]
                }} 
              />
            ))}
          </div>
        </main>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 group">
            <PlusCircleIcon size={28} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Bottom Navigation Bar - Mobile Only */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40">
          <div className="grid grid-cols-5 h-16">
            <button className="flex flex-col items-center justify-center text-purple-600 dark:text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs mt-1">Home</span>
            </button>
            <button className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <SearchIcon size={24} />
              <span className="text-xs mt-1">Search</span>
            </button>
            <button className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <CompassIcon size={24} />
              <span className="text-xs mt-1">Explore</span>
            </button>
            <button className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <BellIcon size={24} />
              <span className="text-xs mt-1">Alerts</span>
            </button>
            <button className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <UserIcon size={24} />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </nav>
      </div>
    </Postprovider>
  );
}

export default Hucn;