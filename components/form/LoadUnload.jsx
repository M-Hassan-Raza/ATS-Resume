import { FaCloudUploadAlt, FaCloudDownloadAlt, FaCheck, FaClock, FaEdit } from "react-icons/fa";
import React, { useContext, useState } from "react";
import { useResumes } from "../../contexts/ResumesContext";
import { ResumeContext } from "../../contexts/ResumeContext";

const LoadUnload = ({ resumeId = null, hasUnsavedChanges = false }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const { renameResume, resumes } = useResumes();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editName, setEditName] = useState('');

  const currentResume = resumeId && resumes[resumeId] ? resumes[resumeId] : null;

  // load backup resume data
  const handleLoad = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const resumeData = JSON.parse(event.target.result);
      setResumeData(resumeData);
    };
    reader.readAsText(file);
  };

  // download resume data
  const handleDownload = (data, filename, event) => {
    event.preventDefault();
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const handleRename = () => {
    if (editName.trim() && editName !== currentResume?.metadata?.name && resumeId) {
      renameResume(resumeId, editName.trim());
    }
    setIsEditingName(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setEditName(currentResume?.metadata?.name || '');
      setIsEditingName(false);
    }
  };

  const startEditing = () => {
    setEditName(currentResume?.metadata?.name || '');
    setIsEditingName(true);
  };

  return (
    <div className="mb-4">
      {currentResume && (
        <div className="mb-4 p-3 bg-fuchsia-700 rounded">
          <div className="flex items-center justify-between mb-2">
            {isEditingName ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={handleKeyPress}
                className="text-white bg-transparent border-b border-fuchsia-300 focus:outline-none focus:border-white text-lg font-semibold"
                autoFocus
              />
            ) : (
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-semibold text-white">{currentResume.metadata.name}</h2>
                <button
                  onClick={startEditing}
                  className="text-fuchsia-200 hover:text-white transition-colors"
                  title="Rename resume"
                >
                  <FaEdit size={14} />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-fuchsia-100">
            {hasUnsavedChanges ? (
              <>
                <FaClock size={12} />
                <span>Auto-saving...</span>
              </>
            ) : (
              <>
                <FaCheck size={12} />
                <span>All changes saved</span>
              </>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-2 justify-center">
        <div className="inline-flex flex-row items-center gap-2">
          <h2 className="text-[1.2rem] text-white">Load Data</h2>
          <label className="p-2 text-white bg-fuchsia-700 rounded cursor-pointer">
            <FaCloudUploadAlt className="text-[1.2rem] text-white" />
            <input
              aria-label="Load Data"
              type="file"
              className="hidden"
              onChange={handleLoad}
              accept=".json"
            />
          </label>
        </div>
        <div className="inline-flex flex-row items-center gap-2">
          <h2 className="text-[1.2rem] text-white">Save Data</h2>
          <button
            aria-label="Save Data"
            className="p-2 text-white bg-fuchsia-700 rounded"
            onClick={(event) =>
              handleDownload(
                resumeData,
                (currentResume?.metadata?.name || resumeData.name || 'Resume') + " by ATSResume.json",
                event
              )
            }
          >
            <FaCloudDownloadAlt className="text-[1.2rem] text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadUnload;
