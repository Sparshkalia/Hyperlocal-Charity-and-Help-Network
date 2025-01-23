'use client';
import { createContext, useContext, useState } from 'react';
export const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);
export const ProfileProvider = ({ children }) => {
  const [profileContent, setProfileContent] = useState([
    {
      id: "1",
      firstname: "Ram",
      lastname: "Charan",
      email: "ram2@gmail.com",
      country: "India",
      city: "Delhi",
    },
  ]);

  return (
    <ProfileContext.Provider value={{ profileContent, setProfileContent }}>
      {children}
    </ProfileContext.Provider>
  );
};
