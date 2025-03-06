"use client";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import {
  PlusCircleIcon,
} from "lucide-react";

export default function CardForm({ onSubmit, darkMode }) {
  const [formData, setFormData] = useState({
    title: "",
    titlelogo: "/slogo.png", 
    postimg: "/sample.png", 
    description: "",
    tags: [],
  });

  const [showForm, setShowForm] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert("Please fill in all required fields.");
      return;
    }

    onSubmit(formData);

    setFormData({
      title: "",
      titlelogo: "/slogo.png",
      postimg: "/sample.png",
      description: "",
      tags: [],
    });

    setShowForm(false);
  };

  return (
    <div
      
    >
      {!showForm ? (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setShowForm(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 group"
          >
            <PlusCircleIcon
              size={28}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
        </div>
      ) : (
        <div className={`border rounded-lg p-4 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <form onSubmit={handleSubmit}>
          <h2
            className={`text-lg font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Create New Post
          </h2>
          <div className="mb-4">
            <label
              htmlFor="title"
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Organization/Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-md border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className={`w-full px-3 py-2 rounded-md border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="postimg"
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Image URL (optional)
            </label>
            <input
              type="text"
              id="postimg"
              name="postimg"
              value={formData.postimg}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-md border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="titlelogo"
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Logo URL (optional)
            </label>
            <input
              type="text"
              id="titlelogo"
              name="titlelogo"
              value={formData.titlelogo}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-md border ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>
          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Tags
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className={`flex-1 px-3 py-2 rounded-l-md border ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 rounded-r-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-purple-100 text-purple-800 rounded-full px-2 py-1"
                >
                  <span className="text-xs mr-1">#{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-purple-800 hover:text-purple-900"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex space-x-3">
            <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
              Create Post
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </form>
        </div>
      )}
    </div>
  );
}
