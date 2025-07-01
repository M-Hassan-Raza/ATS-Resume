import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";
import { FaTimes, FaPlus } from "react-icons/fa";

const Education = () => {
    const { resumeData, setResumeData} = useContext(ResumeContext);

    const handleEducation = (e, index) => {
      const newEducation = [...resumeData.education];
      newEducation[index][e.target.name] = e.target.value;
      setResumeData({ ...resumeData, education: newEducation });
    };
  
    const addEducation = () => {
      const newEducation = {
        id: Date.now() + Math.random(), // Generate unique ID
        school: "", 
        degree: "", 
        startYear: "", 
        endYear: "" 
      };
      setResumeData({
        ...resumeData,
        education: [...resumeData.education, newEducation],
      });
    };
  
    const removeEducation = (id) => {
      const newEducation = resumeData.education.filter(edu => {
        const eduId = edu.id || `${edu.school}-${edu.degree}`;
        return eduId !== id;
      });
      setResumeData({ ...resumeData, education: newEducation });
    };
    
    return (
      <div className="flex-col-gap-2">
        <h2 className="input-title">Education</h2>
        {resumeData.education.map((education, index) => {
          const eduId = education.id || `${education.school}-${education.degree}`;
          const stableKey = education.id || `${education.school}-${education.degree}-${index}`;
          return (
          <div key={stableKey} className="relative border border-gray-300 rounded-lg p-3 bg-white/50">
            <div className="f-col">
              <input
                type="text"
                placeholder="School"
                name="school"
                className="w-full other-input"
                value={education.school}
                onChange={(e) => handleEducation(e, index)} />
              <input
                type="text"
                placeholder="Degree"
                name="degree"
                className="w-full other-input"
                value={education.degree}
                onChange={(e) => handleEducation(e, index)} />
              <div className="flex-wrap-gap-2">
                <input
                  type="date"
                  placeholder="Start Year"
                  name="startYear"
                  className="other-input"
                  value={education.startYear}
                  onChange={(e) => handleEducation(e, index)} />
                <input
                  type="date"
                  placeholder="End Year"
                  name="endYear"
                  className="other-input"
                  value={education.endYear}
                  onChange={(e) => handleEducation(e, index)} />
              </div>
            </div>
            {resumeData.education.length > 1 && (
              <button
                type="button"
                onClick={() => removeEducation(eduId)}
                className="absolute top-2 right-2 p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                title="Remove this education entry"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>
        );
        })}
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-2 p-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
        >
          <FaPlus size={12} />
          <span>Add Education</span>
        </button>
      </div>
    )
  }

export default Education;