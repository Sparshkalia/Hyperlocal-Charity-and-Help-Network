"use client";
import InstaStyleCard from "@/components/card/card";
import { Postprovider } from "@/components/card/postcomponents";
import Usericon from "@/components/userprofile/icon";
import { useState, useEffect } from "react";
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  SearchIcon,
  CompassIcon,
  UserIcon,
} from "lucide-react";

function Hucn() {
  const [postcontent, setPostcontent] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <Postprovider value={{ postcontent }}>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "light" : "dark"}`}>
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-rose-50 to-cyan-100 dark:from-indigo-950 dark:via-purple-900 dark:to-violet-950 opacity-80"></div>
          <div className="absolute top-0 left-0 w-full h-full dark:opacity-0 transition-opacity duration-500">
            <div className="absolute top-[15%] left-[10%] w-96 h-96 rounded-full bg-pink-400 opacity-20 blur-3xl animate-pulse" style={{ animationDuration: '15s' }}></div>
            <div className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl animate-pulse" style={{ animationDuration: '20s' }}></div>
            <div className="absolute top-[40%] right-[30%] w-64 h-64 rounded-full bg-blue-400 opacity-15 blur-3xl animate-pulse" style={{ animationDuration: '25s' }}></div>
            <div className="absolute bottom-[30%] left-[25%] w-72 h-72 rounded-full bg-teal-400 opacity-15 blur-3xl animate-pulse" style={{ animationDuration: '18s' }}></div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full opacity-0 dark:opacity-100 transition-opacity duration-500">
            <div className="absolute top-[10%] left-[15%] w-96 h-96 rounded-full bg-fuchsia-600 opacity-20 blur-3xl animate-pulse" style={{ animationDuration: '22s' }}></div>
            <div className="absolute bottom-[15%] right-[10%] w-80 h-80 rounded-full bg-indigo-600 opacity-20 blur-3xl animate-pulse" style={{ animationDuration: '18s' }}></div>
            <div className="absolute top-[35%] right-[25%] w-64 h-64 rounded-full bg-violet-500 opacity-15 blur-3xl animate-pulse" style={{ animationDuration: '25s' }}></div>
            <div className="absolute bottom-[25%] left-[20%] w-72 h-72 rounded-full bg-blue-600 opacity-15 blur-3xl animate-pulse" style={{ animationDuration: '20s' }}></div>
          </div>

          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmMTAiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTE1IDAgTDMwIDMwIE0zMCAzMCBMNDUgMCBNMCAxNSBMMzAgMzAgTTMwIDMwIEw2MCAxNSBNMTUgNjAgTDMwIDMwIE0zMCAzMCBMNDUgNjAgTTAgNDUgTDMwIDMwIE0zMCAzMCBMNjAgNDUiLz48L2c+PC9zdmc+')] opacity-50"></div>
        </div>
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
                <h1 className="text-xl font-black text-white">H</h1>
              </div>
              <h1 className="ml-2 text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                HUCN
              </h1>
            </div>
            <div className="hidden md:flex items-center max-w-md w-full mx-6 relative">
              <input 
                type="text" 
                placeholder="Search posts, users, or blood types..." 
                className="w-full py-2 px-4 pr-10 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-purple-500 shadow-sm backdrop-blur-sm"
              />
              <SearchIcon className="absolute right-3 text-gray-500 dark:text-gray-400" size={18} />
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-800/50 transition-colors">
                {darkMode ? <SunIcon size={22} className="text-yellow-400" /> : <MoonIcon size={22} className="text-white" />}
              </button>
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-purple-500 shadow-md">
                <Usericon className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-6 space-y-4 relative z-10">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 rounded-2xl overflow-hidden shadow-xl mb-8 p-6 text-white backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Featured Post</h2>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">Important</span>
            </div>
            <p className="text-lg mb-4">
              World Blood Donor Day is coming up on June 14th. Join us in our global campaign to raise awareness about the importance of blood donation!
            </p>
            <button className="px-4 py-2 bg-white text-purple-700 rounded-lg font-medium hover:bg-opacity-90 transition-colors shadow-md">
              Learn More
            </button>
          </div>
        </main>
        <div className="relative z-10">
          <InstaStyleCard />
        </div>
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl shadow-lg z-40">
          <div className="grid grid-cols-5 h-16">
            {[{ icon: "Home", comp: SearchIcon }, { icon: "Search", comp: SearchIcon }, { icon: "Explore", comp: CompassIcon }, { icon: "Alerts", comp: BellIcon }, { icon: "Profile", comp: UserIcon }].map((item, index) => (
              <button key={index} className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <item.comp size={24} />
                <span className="text-xs mt-1">{item.icon}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </Postprovider>
  );
}

export default Hucn;