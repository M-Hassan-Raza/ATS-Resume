import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";
import { FaTimes, FaPlus } from "react-icons/fa";

const WorkExperience = () => {
  const {
    resumeData,
    setResumeData,
  } = useContext(ResumeContext);

  const handleWorkExperience = (e, index) => {
    const newworkExperience = [...resumeData.workExperience];
    newworkExperience[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, workExperience: newworkExperience });
  };

  const addWorkExperience = () => {
    const newWorkExp = {
      id: Date.now() + Math.random(), // Generate unique ID
      company: "",
      position: "",
      description: "",
      keyAchievements: "",
      startYear: "",
      endYear: "",
    };
    setResumeData({
      ...resumeData,
      workExperience: [...resumeData.workExperience, newWorkExp],
    });
  };

  const removeWorkExperience = (id) => {
    const newworkExperience = resumeData.workExperience.filter(exp => {
      const expId = exp.id || `${exp.company}-${exp.position}`;
      return expId !== id;
    });
    setResumeData({ ...resumeData, workExperience: newworkExperience });
  };

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Work Experience</h2>
      {resumeData.workExperience.map((workExperience, index) => {
        const expId = workExperience.id || `${workExperience.company}-${workExperience.position}`;
        const stableKey = workExperience.id || `${workExperience.company}-${workExperience.position}-${index}`;
        return (
        <div key={stableKey} className="relative border border-gray-300 rounded-lg p-3 bg-white/50">
          <div className="f-col">
          <input
            type="text"
            placeholder="Company"
            name="company"
            className="w-full other-input"
            value={workExperience.company}
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <input
            type="text"
            placeholder="Job Title"
            name="position"
            className="w-full other-input"
            value={workExperience.position}
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <textarea
            type="text"
            placeholder="Description"
            name="description"
            className="w-full other-input h-32"
            value={workExperience.description}
            maxLength="250"
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <textarea
            type="text"
            placeholder="Key Achievements"
            name="keyAchievements"
            className="w-full other-input h-40"
            value={workExperience.keyAchievements}
            onChange={(e) => handleWorkExperience(e, index)}
          />
          <div className="flex-wrap-gap-2">
            <input
              type="date"
              placeholder="Start Year"
              name="startYear"
              className="other-input"
              value={workExperience.startYear}
              onChange={(e) => handleWorkExperience(e, index)}
            />
            <input
              type="date"
              placeholder="End Year"
              name="endYear"
              className="other-input"
              value={workExperience.endYear}
              onChange={(e) => handleWorkExperience(e, index)}
            />
          </div>
          </div>
          {resumeData.workExperience.length > 1 && (
            <button
              type="button"
              onClick={() => removeWorkExperience(expId)}
              className="absolute top-2 right-2 p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
              title="Remove this work experience"
            >
              <FaTimes size={12} />
            </button>
          )}
        </div>
        );
      })}
      <button
        type="button"
        onClick={addWorkExperience}
        className="flex items-center gap-2 p-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
      >
        <FaPlus size={12} />
        <span>Add Work Experience</span>
      </button>
    </div>
  );
};

export default WorkExperience;
