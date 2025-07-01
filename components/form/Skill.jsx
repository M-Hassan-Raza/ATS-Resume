import React, { useContext } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";
import FormButton from "./FormButton";
import { FaTimes, FaPlus } from "react-icons/fa";

const Skill = ({ title }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // skills
  const handleSkill = (e, id, title) => {
    const value = e.target.value;
    setResumeData((prevData) => ({
      ...prevData,
      skills: prevData.skills.map((skill) => {
        if (skill.title === title) {
          const updatedSkills = skill.skills.map(skillItem => {
            if (typeof skillItem === 'object') {
              return skillItem.id === id ? { ...skillItem, value } : skillItem;
            } else {
              // Handle legacy string format
              return skillItem === id ? value : skillItem;
            }
          });
          return { ...skill, skills: updatedSkills };
        }
        return skill;
      }),
    }));
  };

  const addSkill = (title) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills?.find(
        (skillType) => skillType.title === title
      );
      if (!skillType) return prevData;
      const newSkill = {
        id: Date.now() + Math.random(),
        value: ""
      };
      const newSkills = [...skillType.skills, newSkill];
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const removeSkill = (title, id) => {
    setResumeData((prevData) => {
      const skillType = prevData.skills?.find(
        (skillType) => skillType.title === title
      );
      if (!skillType) return prevData;
      const newSkills = skillType.skills.filter(skill => {
        const skillId = typeof skill === 'object' ? skill.id : skill;
        return skillId !== id;
      });
      const updatedSkills = prevData.skills.map((skill) =>
        skill.title === title ? { ...skill, skills: newSkills } : skill
      );
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  const skillType = resumeData.skills?.find(
    (skillType) => skillType.title === title
  );

  if (!skillType || !skillType.skills) {
    return null;
  }

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">{title}</h2>
      {skillType.skills.map((skill, index) => {
        const isObject = typeof skill === 'object';
        const skillId = isObject ? skill.id : skill;
        const skillValue = isObject ? skill.value : skill;
        const stableKey = skillId || `${title}-${index}`;
        
        return (
        <div key={stableKey} className="relative">
          <input
            type="text"
            placeholder={title}
            name={title}
            className="w-full other-input pr-8"
            value={skillValue}
            onChange={(e) => handleSkill(e, skillId, title)}
          />
          {skillType.skills && skillType.skills.length > 1 && (
            <button
              type="button"
              onClick={() => removeSkill(title, skillId)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
              title={`Remove this ${title.toLowerCase()}`}
            >
              <FaTimes size={10} />
            </button>
          )}
        </div>
        );
      })}
      <button
        type="button"
        onClick={() => addSkill(title)}
        className="flex items-center gap-2 p-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors text-sm"
      >
        <FaPlus size={10} />
        <span>Add {title}</span>
      </button>
    </div>
  );
};

export default Skill;
