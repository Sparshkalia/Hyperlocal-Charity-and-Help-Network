'use client';
import React from 'react';
import ProfilePage from '@/components/userprofile/userprofile';
import { ProfileProvider } from '@/components/userprofile/profilecomponents';

function UsersPage() {
  return (
    <ProfileProvider>
      <ProfilePage />
    </ProfileProvider>
  );
}

export default UsersPage;
