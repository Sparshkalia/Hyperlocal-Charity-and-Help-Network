'use client';
import React, { useState } from 'react';
import { usepost } from './postcomponents';

export default function PostForm() {
  const { addpostcontent } = usepost();

  const [formData, setFormData] = useState({
    title: '',
    time: '',
    titlelogo: null,
    postimg: null,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'titlelogo' || name === 'postimg') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: 'numeric', 
      minute: 'numeric', 
      second: 'numeric', 
      hour12: true, 
    };
    return now.toLocaleString('en-US', options); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now().toString(),
      title: formData.title,
      time: getCurrentDateTime(),
      titlelogo: formData.titlelogo ? URL.createObjectURL(formData.titlelogo) : null,
      postimg: formData.postimg ? URL.createObjectURL(formData.postimg) : null,
      description: formData.description,
    };
    addpostcontent(newPost);
    setFormData({
      title: '',
      time: '',
      titlelogo: null,
      postimg: null,
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Create a Post</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200 text-black"
          placeholder="Enter title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Time</label>
        <input
          type="text"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200"
          placeholder="Current system time will be takken automatically"
          disabled
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Title Logo</label>
        <input
          type="file"
          name="titlelogo"
          accept="image/*"
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md text-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Post Image</label>
        <input
          type="file"
          name="postimg"
          accept="image/*"
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded-md text-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-200 text-black"
          placeholder="Enter description"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
}
