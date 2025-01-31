"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfilePage from '@/components/userprofile/userprofile';
import { ProfileProvider } from '@/components/userprofile/profilecomponents';
import { useParams } from 'next/navigation';

function UsersPage() {
  const params = useParams();
  const userid = parseInt(params.userid, 10);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${userid}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userid) {
      fetchUserData();
    }
  }, [userid]);

  return (
    <div>
      <h1>{userid ? `User ID: ${userid}` : 'User ID not found'}</h1>
      <ProfileProvider>
        <ProfilePage userData={userData} />
      </ProfileProvider>
    </div>
  );
}

export default UsersPage;