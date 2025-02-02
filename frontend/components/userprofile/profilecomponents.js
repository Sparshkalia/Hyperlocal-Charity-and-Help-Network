'use client';
import { createContext, useContext, useState } from 'react';
export const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);
export const ProfileProvider = ({ children, initialProfile }) => {
  const [profileContent, setProfileContent] = useState(initialProfile || {
    fullname: "",
    email: "",
    username: "",
    profilePic: "/slogo.png", // Default image if null
    createdAt: "",
  });

  return (
    <ProfileContext.Provider value={{ profileContent, setProfileContent }}>
      {children}
    </ProfileContext.Provider>
  );
};
