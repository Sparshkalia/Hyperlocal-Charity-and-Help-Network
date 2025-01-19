"use client";
import InstaStyleCard from '@/components/card';
import { Postprovider } from '@/components/postcomponents';
import PostForm from '@/components/postform';
import { useState } from 'react';

function Hucn() {
  const [postcontent, setPostcontent] = useState([]);

  const addpostcontent = (post) => {
    console.log('Post Added:', post); // Debugging: Check if post is being added
    setPostcontent((prevPosts) => [...prevPosts, post]);
  };

  const updatepostcontent = (updatedPost, id) => {
    setPostcontent((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? updatedPost : post))
    );
  };

  const deletepostcontent = (id) => {
    setPostcontent((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const post = {
    id: "1",
    title: "AIIMS New-Delhi",
    time: "1 hour ago",
    titlelogo: "/slogo.png",
    postimg: "/sample.png",
    discription: "Urgent need of blood!",
  };

  return (
    <Postprovider value={{ postcontent, addpostcontent, updatepostcontent, deletepostcontent }}>
      <div>
        <InstaStyleCard post={post} />
      </div>
      {postcontent.map((post) => (
        <InstaStyleCard key={post.id} post={post} />
      ))}
      <PostForm />
    </Postprovider>
  );
}

export default Hucn;

