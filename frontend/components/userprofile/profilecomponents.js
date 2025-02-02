'use client';

import { createContext, useContext, useState } from 'react';

// Create ProfileContext
export const ProfileContext = createContext();

// Custom Hook to Use Profile Context
export const useProfile = () => useContext(ProfileContext);

// Profile Provider Component
export const ProfileProvider = ({ children }) => {
  const [profileContent, setProfileContent] = useState({
    id: "1",
    fullname: "Ram Charan",
    email: "ram2@gmail.com",
    country: "India",
    city: "Delhi",
    username: "ramcharan92",
    profilePic: "/default-profile.png",
    createdAt: "2025-01-24T19:48:28.176Z",
  });

  return (
    <ProfileContext.Provider value={{ profileContent, setProfileContent }}>
      {children}
    </ProfileContext.Provider>
  );
};
