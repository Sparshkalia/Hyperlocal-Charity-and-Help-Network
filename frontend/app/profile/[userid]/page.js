"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfilePage from "@/components/userprofile/userprofile";
import { ProfileProvider } from "@/components/userprofile/profilecomponents";
import { useParams } from "next/navigation";

function UsersPage() {
    const params = useParams();
    const userid = parseInt(params.userid, 10);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/user/${userid}`, {
                    withCredentials: true,
                });
                console.log("Fetched User Data:", response.data);
                
                setUserData({
                    fullname: response.data.full_name,
                    email: response.data.email,
                    username: response.data.username,
                    profilePic: response.data.profile_pic || "/slogo.png", // Default if null
                    createdAt: new Date(response.data.created_at).toLocaleDateString(), // Format date
                });

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (userid) {
            fetchUserData();
        }
    }, [userid]);

    return (
        <div>
            {!userData ? (
                <p>Loading user data...</p>
            ) : (
                <ProfileProvider initialProfile={userData}>
                    <ProfilePage />
                </ProfileProvider>
            )}
        </div>
    );
}

export default UsersPage;
