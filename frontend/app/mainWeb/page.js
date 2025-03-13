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
  CalendarIcon,
  HeartIcon,
  TrendingUpIcon,
  StarIcon
} from "lucide-react";

function Hucn() {
  const [postcontent, setPostcontent] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("featured");
  
  // Health awareness dates
  const healthDates = [
    { date: "February 3", title: "World Cancer Day", color: "bg-pink-500" },
    { date: "March 6", title: "World Dentist Day", color: "bg-blue-500" },
    { date: "March 20", title: "World Oral Health Day", color: "bg-cyan-500" },
    { date: "March 24", title: "World Tuberculosis Day", color: "bg-amber-500" },
    { date: "April 7", title: "World Health Day", color: "bg-green-500" },
    { date: "May 5", title: "World Hand Hygiene Day", color: "bg-indigo-500" },
    { date: "May 12", title: "International Nurses Day", color: "bg-red-500" },
    { date: "May 31", title: "World No Tobacco Day", color: "bg-gray-500" },
    { date: "June 14", title: "World Blood Donor Day", color: "bg-red-600" },
    { date: "July 1", title: "World Doctors Day", color: "bg-blue-600" },
    { date: "July 28", title: "World Hepatitis Day", color: "bg-yellow-500" },
    { date: "September 29", title: "World Heart Day", color: "bg-red-500" },
    { date: "October 10", title: "World Mental Health Day", color: "bg-purple-500" },
    { date: "October 16", title: "World Food Day", color: "bg-orange-500" },
    { date: "November 14", title: "World Diabetes Day", color: "bg-blue-400" },
    { date: "December 1", title: "World AIDS Day", color: "bg-red-500" },
  ];
  
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
    
    // Update date every day
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 86400000); // 24 hours
    
    // Get upcoming events
    findUpcomingEvents();
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    findUpcomingEvents();
  }, [currentDate]);
  
  const findUpcomingEvents = () => {
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    
    const upcoming = healthDates.filter(event => {
      const [month, day] = getMonthAndDay(event.date);
      // Find events in the next 60 days
      if (month === currentMonth && day >= currentDay) return true;
      if (month === (currentMonth + 1) % 12) return true;
      if (month === (currentMonth + 2) % 12 && day <= currentDay) return true;
      return false;
    });
    
    upcoming.sort((a, b) => {
      const [monthA, dayA] = getMonthAndDay(a.date);
      const [monthB, dayB] = getMonthAndDay(b.date);
      
      if (monthA !== monthB) return monthA - monthB;
      return dayA - dayB;
    });
    
    setUpcomingEvents(upcoming.slice(0, 5)); 
  };
  
  const getMonthAndDay = (dateString) => {
    const months = {
      "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
      "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
    };
    
    const [month, day] = dateString.split(" ");
    return [months[month], parseInt(day)];
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const toggleTheme = () => setDarkMode(!darkMode);

  const getDaysUntil = (dateString) => {
    const [month, day] = getMonthAndDay(dateString);
    const eventDate = new Date(currentDate.getFullYear(), month, day);
    if (eventDate < currentDate) {
      eventDate.setFullYear(currentDate.getFullYear() + 1);
    }
    
    const diffTime = Math.abs(eventDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return (
    <Postprovider value={{ postcontent }}>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark" : "light"}`}>
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
              <div className="hidden md:flex text-gray-700 dark:text-gray-300 text-sm font-medium">
                <CalendarIcon className="mr-1" size={16} />
                {formatDate(currentDate)}
              </div>
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-800/50 transition-colors">
                {darkMode ? <SunIcon size={22} className="text-yellow-400" /> : <MoonIcon size={22} className="text-gray-700" />}
              </button>
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-purple-500 shadow-md">
                <Usericon className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </header>
        
        {/* Tab navigation for different content */}
        <div className="max-w-3xl mx-auto px-4 pt-6 pb-2 relative z-10">
          <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-2">
            <button 
              onClick={() => setActiveTab("featured")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "featured" 
                  ? "bg-purple-600 text-white shadow-md" 
                  : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80"
              }`}
            >
              <StarIcon className="inline mr-1" size={16} /> Featured
            </button>
            <button 
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "upcoming" 
                  ? "bg-purple-600 text-white shadow-md" 
                  : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80"
              }`}
            >
              <CalendarIcon className="inline mr-1" size={16} /> Upcoming Events
            </button>
            <button 
              onClick={() => setActiveTab("trending")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "trending" 
                  ? "bg-purple-600 text-white shadow-md" 
                  : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80"
              }`}
            >
              <TrendingUpIcon className="inline mr-1" size={16} /> Trending
            </button>
            <button 
              onClick={() => setActiveTab("allDates")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "allDates" 
                  ? "bg-purple-600 text-white shadow-md" 
                  : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80"
              }`}
            >
              <HeartIcon className="inline mr-1" size={16} /> Health Calendar
            </button>
          </div>
        </div>
        
        <main className="max-w-3xl mx-auto px-4 pb-20 space-y-6 relative z-10">
          {/* Featured content */}
          {activeTab === "featured" && (
            <>
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 rounded-2xl overflow-hidden shadow-xl p-6 text-white backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 transform transition-all hover:scale-[1.01] duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Featured Event</h2>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm animate-pulse">Coming Soon!</span>
                </div>
                <p className="text-lg mb-4">
                  World Blood Donor Day is coming up on June 14th. Join us in our global campaign to raise awareness about the importance of blood donation!
                </p>
                <div className="mb-4 w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex items-center justify-between text-sm text-white/80 mb-4">
                  <span>Today</span>
                  <span>June 14</span>
                </div>
                <button className="px-4 py-2 bg-white text-purple-700 rounded-lg font-medium hover:bg-opacity-90 transition-colors shadow-md">
                  Learn More
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-md transform transition-all hover:scale-[1.02] duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      <CalendarIcon size={18} />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-800 dark:text-gray-200">World Doctors Day</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">July 1</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Celebrate the contributions of physicians to individuals and communities. Share your story about a doctor who made a difference in your life.
                  </p>
                </div>
                
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl shadow-md transform transition-all hover:scale-[1.02] duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <CalendarIcon size={18} />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-800 dark:text-gray-200">World Dentist Day</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">March 6</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Recognizing dentists worldwide for their commitment to oral health. Schedule your checkup and thank your dentist!
                  </p>
                </div>
              </div>
            </>
          )}
          
          {/* Upcoming events */}
          {activeTab === "upcoming" && (
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 text-white">
                <h2 className="text-xl font-bold flex items-center">
                  <CalendarIcon className="mr-2" size={20} />
                  Upcoming Health Awareness Days
                </h2>
                <p className="text-sm opacity-80">Stay informed about important health events</p>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {upcomingEvents.map((event, index) => (
                  <div 
                    key={index} 
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-lg ${event.color} flex items-center justify-center text-white shadow-md`}>
                        <span className="font-bold">{event.date.split(" ")[1]}</span>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-gray-800 dark:text-gray-200">{event.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                        {getDaysUntil(event.date) === 0 ? "Today!" : `${getDaysUntil(event.date)} days`}
                      </span>
                      <button className="block mt-2 text-sm text-purple-600 dark:text-purple-400 hover:underline">
                        Add reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 text-center">
                <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                  View All Health Events
                </button>
              </div>
            </div>
          )}
          
          {/* Health calendar (all dates) */}
          {activeTab === "allDates" && (
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 text-white">
                <h2 className="text-xl font-bold flex items-center">
                  <HeartIcon className="mr-2" size={20} />
                  Health Awareness Calendar
                </h2>
                <p className="text-sm opacity-80">Important dates to promote health and well-being</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {healthDates.map((event, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow flex items-center"
                  >
                    <div className={`w-10 h-10 rounded-lg ${event.color} flex items-center justify-center text-white shadow-sm mr-3 flex-shrink-0`}>
                      <span className="font-bold">{event.date.split(" ")[1].substring(0, 2)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">{event.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Trending content */}
          {activeTab === "trending" && (
            <div className="space-y-4">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-800 text-white">
                  <h2 className="text-xl font-bold flex items-center">
                    <TrendingUpIcon className="mr-2" size={20} />
                    Trending Health Topics
                  </h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {["New blood donation guidelines", "Mental health awareness campaign", "Telemedicine innovation", "Preventive healthcare trends"].map((topic, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-400 dark:text-gray-500 mr-3">#{index + 1}</span>
                        <div>
                          <h3 className="font-bold text-gray-800 dark:text-gray-200">{topic}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{1200 - (index * 200)} people discussing</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="relative z-10">
            <InstaStyleCard />
          </div>
        </main>
        
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl shadow-lg z-40">
          <div className="grid grid-cols-5 h-16">
            {[
              { icon: "Home", comp: SearchIcon }, 
              { icon: "Search", comp: SearchIcon }, 
              { icon: "Explore", comp: CompassIcon }, 
              { icon: "Alerts", comp: BellIcon }, 
              { icon: "Profile", comp: UserIcon }
            ].map((item, index) => (
              <button 
                key={index} 
                className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
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