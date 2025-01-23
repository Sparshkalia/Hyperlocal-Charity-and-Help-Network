"use client";
import InstaStyleCard from '@/components/card/card';
import { Postprovider } from '@/components/card/postcomponents';
import PostForm from '@/components/card/postform';
import Usericon from '@/components/userprofile/icon';
import { useState } from 'react';

function Postadder() {
  const [postcontent, setPostcontent] = useState([]);

  const addpostcontent = (post) => {
    console.log('Post Added:', post);
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
    description: "Urgent need of blood!",
  };

  return (
    <Postprovider value={{ postcontent, addpostcontent, updatepostcontent, deletepostcontent }}>
      <Usericon/>
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

export default Postadder;