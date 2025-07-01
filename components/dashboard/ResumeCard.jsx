import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCopy, FaEye } from 'react-icons/fa';
import { useRouter } from 'next/router';

const ResumeCard = ({ resume, onDelete, onDuplicate, onRename }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(resume.metadata.name);

  const handleEdit = () => {
    router.push(`/builder?id=${resume.metadata.id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${resume.metadata.name}"?`)) {
      onDelete(resume.metadata.id);
    }
  };

  const handleDuplicate = () => {
    onDuplicate(resume.metadata.id);
  };

  const handleRename = () => {
    if (editName.trim() && editName !== resume.metadata.name) {
      onRename(resume.metadata.id, editName.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setEditName(resume.metadata.name);
      setIsEditing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={handleKeyPress}
              className="text-xl font-semibold text-gray-900 bg-transparent border-b-2 border-fuchsia-500 focus:outline-none focus:border-fuchsia-600"
              autoFocus
            />
          ) : (
            <h3 className="text-xl font-semibold text-gray-900 truncate">
              {resume.metadata.name}
            </h3>
          )}
          
          <div className="flex space-x-2 ml-4">
            <button
              onClick={handleEdit}
              className="p-2 text-gray-600 hover:text-fuchsia-600 hover:bg-fuchsia-50 rounded transition-colors"
              title="Edit Resume"
            >
              <FaEdit size={16} />
            </button>
            
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Rename Resume"
            >
              <FaEdit size={16} />
            </button>
            
            <button
              onClick={handleDuplicate}
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
              title="Duplicate Resume"
            >
              <FaCopy size={16} />
            </button>
            
            <button
              onClick={handleDelete}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="Delete Resume"
            >
              <FaTrash size={16} />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Position:</span> {resume.position || 'Not specified'}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Name:</span> {resume.name || 'Not specified'}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Email:</span> {resume.email || 'Not specified'}
          </p>
        </div>

        <div className="border-t pt-4">
          <div className="text-xs text-gray-500 space-y-1">
            <p><span className="font-medium">Created:</span> {formatDate(resume.metadata.created)}</p>
            <p><span className="font-medium">Modified:</span> {formatDate(resume.metadata.modified)}</p>
            <p><span className="font-medium">Last opened:</span> {formatDate(resume.metadata.lastOpened)}</p>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleEdit}
            className="w-full bg-fuchsia-600 text-white py-2 px-4 rounded hover:bg-fuchsia-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <FaEye size={14} />
            <span>Open Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;