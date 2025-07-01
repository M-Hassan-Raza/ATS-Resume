import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';

const CreateResumeButton = ({ onCreate }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [resumeName, setResumeName] = useState('');

  const handleCreate = () => {
    const name = resumeName.trim() || 'Untitled Resume';
    const result = onCreate(name);
    if (result) {
      router.push(`/builder?id=${result.id}`);
    }
    setShowModal(false);
    setResumeName('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCreate();
    } else if (e.key === 'Escape') {
      setShowModal(false);
      setResumeName('');
    }
  };

  return (
    <>
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors duration-200">
        <button
          onClick={() => setShowModal(true)}
          className="w-full h-full p-8 flex flex-col items-center justify-center text-gray-600 hover:text-slate-600 transition-colors duration-200 min-h-[300px]"
        >
          <FaPlus size={48} className="mb-4" />
          <span className="text-xl font-semibold">Create New Resume</span>
          <span className="text-sm text-gray-500 mt-2">Start building your professional resume</span>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Resume</h3>
            
            <div className="mb-4">
              <label htmlFor="resumeName" className="block text-sm font-medium text-gray-700 mb-2">
                Resume Name
              </label>
              <input
                id="resumeName"
                type="text"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="e.g. Software Developer Resume"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty for "Untitled Resume"
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setResumeName('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
              >
                Create Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateResumeButton;