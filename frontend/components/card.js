'use client'
import Image from 'next/image';
import { useState } from 'react';
import sample from './sample.png';
import slogo from './slogo.png';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { FiShare } from 'react-icons/fi';

export default function InstaStyleCard() {
  const [likes, setLikes] = useState(121); 
  const [isShared, setIsShared] = useState(false);
  const [comments, setComments] = useState([
    "i am willing to donate!",
    "Donation for good cause!",
    "mine blood group is B+!",
  ]);
  const [isLiked, setIsLiked] = useState(false); 
  
  const handleLiked = () => {
    setIsLiked(!isLiked);
    if (isLiked) setLikes((prev) => prev - 1);
    if (!isLiked) setLikes((prev) => prev + 1);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    const comment = e.target.elements.comment.value.trim();
    if (comment) {
      setComments((prev) => [...prev, comment]);
      e.target.reset();
    }
  };

  const handleShare = () => {
    setIsShared(true); 
    setTimeout(() => setIsShared(false), 2000); 
  };

  return (
    <div className="max-w-md mx-auto bg-white border rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center px-4 py-3 space-x-3">
        <Image
          src={slogo} 
          alt="Profile Picture"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="text-sm font-medium text-gray-800">AIIMS-New Delhi</p>
          <p className="text-xs text-gray-500">8 hours ago</p>
        </div>
      </div>
      <div className="relative h-64 w-full">
        <Image
          src={sample} 
          alt="Post Image"
          fill
          style={{ objectFit: 'cover',borderRadius:'10px'}}
        />
      </div>
      <div className="flex items-center px-4 py-3 space-x-6">
        <div className="text-3xl">
          {isLiked ? (
            <FcLike onClick={handleLiked} className="cursor-pointer" />
          ) : (
            <FcLikePlaceholder onClick={handleLiked} className="cursor-pointer" />
          )}
        </div>
        <p className="text-lg font-medium flex-1">
          <span className="ml-2 text-sm text-black">{likes} Likes</span>
        </p>
        <div
          onClick={handleShare}
          className={`cursor-pointer text-2xl ${isShared ? 'text-blue-500' : 'text-gray-600'}`}
        >
          <FiShare />
        </div>
        <button className="flex items-center text-gray-800 hover:text-gray-600">
          <span className="ml-2 text-sm">Share</span>
        </button>
      </div>
      <div className="px-4 py-2">
        <p className="text-sm text-gray-800">
          <span className="font-semibold">AIIMS-New Delhi</span> Urjent Need of blood!!
        </p>
      </div>
      <div className="px-4 py-2">
        {comments.slice(0, 3).map((comment, index) => (
          <p key={index} className="text-sm text-gray-700">
            <span className="font-semibold">User {index + 1}</span> {comment}
          </p>
        ))}
        {comments.length > 3 && (
          <p className="text-sm text-gray-500 cursor-pointer mt-1">
            View all {comments.length} comments
          </p>
        )}
      </div>
      <form
        onSubmit={handleAddComment}
        className="flex items-center px-4 py-3 border-t bg-gray-50"
      >
        <input
          type="text"
          name="comment"
          placeholder="Add a comment..."
          className="flex-1 p-2 text-sm border-none focus:outline-none bg-white"
        />
        <button
          type="submit"
          className="text-blue-500 text-sm font-semibold hover:text-blue-700"
        >
          Post
        </button>
      </form>
    </div>
  );
}
