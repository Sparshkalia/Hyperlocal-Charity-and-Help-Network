'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FiShare } from 'react-icons/fi';

export default function InstaStyleCard({ post }) {
  const [comments, setComments] = useState([
    'I am willing to donate!',
    'Donation for a good cause!',
    'My blood group is B+!',
  ]);

  const [showAllComments, setShowAllComments] = useState(false);

  const handleAddComment = (e) => {
    e.preventDefault();
    const comment = e.target.elements.comment.value.trim();
    if (comment) {
      setComments((prev) => [...prev, comment]);
      e.target.reset();
    }
  };

  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: 'Join us in this noble cause! Donate blood and save lives.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing not supported on this device.');
    }
  };

  return (
    <div className="m-5">
      <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center px-4 py-3 space-x-3 bg-gray-50">
          <Image
            src={post.titlelogo}
            alt="Profile Picture"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">{post.title}</p>
            <p className="text-xs text-gray-500">{post.time}</p>
          </div>
        </div>
        <div className="relative h-64 w-full">
          <Image
            src={post.postimg}
            alt="Post Image"
            fill
            style={{ objectFit: 'cover', borderRadius: '10px' }}
          />
        </div>
        <div className="flex items-center justify-between px-4 py-3 space-x-6 bg-gray-50">
          <button
            onClick={handleShare}
            className="flex items-center text-gray-800 hover:text-blue-500"
          >
            <FiShare className="text-lg" />
            <span className="ml-2 text-sm font-medium">Share</span>
          </button>
        </div>
        <div className="px-4 py-3">
        <div>
            <p className='text-black'>
              <strong>{post.title}: </strong>
              {post.description}
            </p>
          </div>
          <br/>
          <h3 className="text-sm font-medium text-gray-800 mb-2">Comments</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            {(showAllComments ? comments : comments.slice(0, 2)).map(
              (comment, index) => (
                <li key={index} className="bg-gray-100 p-2 rounded-md">
                  {comment}
                </li>
              )
            )}
          </ul>
          {comments.length > 2 && (
            <button
              onClick={toggleComments}
              className="text-blue-500 text-xs mt-2"
            >
              {showAllComments ? 'Show Less' : `Show ${comments.length - 2} more comments`}
            </button>
          )}
        </div>
        <form onSubmit={handleAddComment} className="px-4 py-3">
          <input
            type="text"
            name="comment"
            placeholder="Add a comment..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring focus:ring-blue-200 text-black"
          />
          <button
            type="submit"
            className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md text-sm hover:bg-blue-600 transition"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}
