import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "../../contexts/ResumeContext";
import { FaTimes, FaPlus } from "react-icons/fa";

const Projects = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleProjects = (e, index) => {
    const newProjects = [...resumeData.projects];
    newProjects[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, projects: newProjects });
  };

  const addProjects = () => {
    const newProject = {
      id: Date.now() + Math.random(), // Generate unique ID
      title: "",
      link: "",
      description: "",
      keyAchievements: "",
      startYear: "",
      endYear: "",
    };
    setResumeData({
      ...resumeData,
      projects: [...resumeData.projects, newProject],
    });
  };

  const removeProjects = (id) => {
    const newProjects = resumeData.projects.filter(project => {
      const projectId = project.id || `${project.title}-${project.description}`;
      return projectId !== id;
    });
    setResumeData({ ...resumeData, projects: newProjects });
  };

  return (
    <div className="flex-col-gap-2">
      <h2 className="input-title">Projects</h2>
      {resumeData.projects.map((project, index) => {
        const projectId = project.id || `${project.title}-${project.description}`;
        const stableKey = project.id || `${project.title}-${project.description}-${index}`;
        return (
        <div key={stableKey} className="relative border border-gray-300 rounded-lg p-3 bg-white/50">
          <div className="f-col">
          <input
            type="text"
            placeholder="Project Name"
            name="title"
            className="w-full other-input"
            value={project.title}
            onChange={(e) => handleProjects(e, index)}
          />
          <input
            type="text"
            placeholder="Link"
            name="link"
            className="w-full other-input"
            value={project.link}
            onChange={(e) => handleProjects(e, index)}
          />
          <textarea
            type="text"
            placeholder="Description"
            name="description"
            className="w-full other-input h-32"
            value={project.description}
            maxLength="250"
            onChange={(e) => handleProjects(e, index)}
          />
          <textarea
            type="text"
            placeholder="Key Achievements"
            name="keyAchievements"
            className="w-full other-input h-40"
            value={project.keyAchievements}
            onChange={(e) => handleProjects(e, index)}
          />
          <div className="flex-wrap-gap-2">
            <input
              type="date"
              placeholder="Start Year"
              name="startYear"
              className="other-input"
              value={project.startYear}
              onChange={(e) => handleProjects(e, index)}
            />
            <input
              type="date"
              placeholder="End Year"
              name="endYear"
              className="other-input"
              value={project.endYear}
              onChange={(e) => handleProjects(e, index)}
            />
          </div>
          </div>
          {resumeData.projects.length > 1 && (
            <button
              type="button"
              onClick={() => removeProjects(projectId)}
              className="absolute top-2 right-2 p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
              title="Remove this project"
            >
              <FaTimes size={12} />
            </button>
          )}
        </div>
        );
      })}
      <button
        type="button"
        onClick={addProjects}
        className="flex items-center gap-2 p-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
      >
        <FaPlus size={12} />
        <span>Add Project</span>
      </button>
    </div>
  );
};

export default Projects;
