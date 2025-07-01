import React, { useContext } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";
import FormButton from "./FormButton";
import { FaTimes, FaPlus } from "react-icons/fa";

const Language = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const skillType = "languages";
  const title = "Languages";
  const placeholder = "Language";

  const handleSkills = (e, id, skillType) => {
    const value = e.target.value;
    const newSkills = resumeData[skillType].map(lang => {
      if (typeof lang === 'object') {
        return lang.id === id ? { ...lang, value } : lang;
      } else {
        // Handle legacy string format
        return lang === id ? value : lang;
      }
    });
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };

  const addSkill = () => {
    const newLanguage = {
      id: Date.now() + Math.random(),
      value: ""
    };
    setResumeData({ ...resumeData, [skillType]: [...resumeData[skillType], newLanguage] });
  };

  const removeSkill = (id) => {
    const newSkills = resumeData[skillType].filter(lang => {
      const langId = typeof lang === 'object' ? lang.id : lang;
      return langId !== id;
    });
    setResumeData({ ...resumeData, [skillType]: newSkills });
  };  

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">{title}</h2>
      {resumeData[skillType].map((skill, index) => {
        const isObject = typeof skill === 'object';
        const skillId = isObject ? skill.id : skill;
        const skillValue = isObject ? skill.value : skill;
        const stableKey = skillId || `${title}-${index}`;
        
        return (
        <div key={stableKey} className="relative">
          <input
            type="text"
            placeholder={placeholder}
            name="skill"
            className="w-full other-input pr-8"
            value={skillValue}
            onChange={(e) => handleSkills(e, skillId, skillType)}
          />
          {resumeData[skillType].length > 1 && (
            <button
              type="button"
              onClick={() => removeSkill(skillId)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
              title="Remove this language"
            >
              <FaTimes size={10} />
            </button>
          )}
        </div>
        );
      })}
      <button
        type="button"
        onClick={addSkill}
        className="flex items-center gap-2 p-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors text-sm"
      >
        <FaPlus size={10} />
        <span>Add Language</span>
      </button>
    </div>
  );
};

export default Language;