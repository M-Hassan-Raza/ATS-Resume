import React, { useState, useContext, useEffect, useCallback } from "react";
import { useRouter } from 'next/router';
import { ResumeContext } from "../contexts/ResumeContext";
import { useResumes } from '../contexts/ResumesContext';
import Language from "../components/form/Language";
import Meta from "../components/meta/Meta";
import FormCP from "../components/form/FormCP";
import LoadUnload from "../components/form/LoadUnload";
import Preview from "../components/preview/Preview";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import dynamic from "next/dynamic";
import Certification from "../components/form/certification";
import Header from "../components/navigation/Header";

// server side rendering false
const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function Builder(props) {
  const router = useRouter();
  const { id } = router.query;
  const { 
    resumes, 
    loading: resumesLoading, 
    updateResume, 
    setActiveResume,
    markUnsavedChanges,
    clearUnsavedChanges,
    hasUnsavedChanges
  } = useResumes();

  // resume data
  const [resumeData, setResumeData] = useState(DefaultResumeData);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);

  // form hide/show
  const [formClose, setFormClose] = useState(false);

  const currentResume = id && resumes[id] ? resumes[id] : null;

  // Load resume data when component mounts or ID changes
  useEffect(() => {
    if (!resumesLoading) {
      if (id && resumes[id]) {
        // Ensure resume data has all required fields
        const loadedResume = {
          ...DefaultResumeData,
          ...resumes[id],
          // Ensure arrays exist
          skills: resumes[id].skills || DefaultResumeData.skills,
          education: resumes[id].education || DefaultResumeData.education,
          workExperience: resumes[id].workExperience || DefaultResumeData.workExperience,
          projects: resumes[id].projects || DefaultResumeData.projects,
          socialMedia: resumes[id].socialMedia || DefaultResumeData.socialMedia,
          languages: resumes[id].languages || DefaultResumeData.languages,
          certifications: resumes[id].certifications || DefaultResumeData.certifications,
        };
        setResumeData(loadedResume);
        setActiveResume(id);
        setIsLoading(false);
      } else if (id) {
        setNotFound(true);
        setIsLoading(false);
      } else {
        // No ID - show empty resume
        setResumeData(DefaultResumeData);
        setIsLoading(false);
      }
    }
  }, [resumesLoading, id, resumes, setActiveResume]);

  // Auto-save functionality
  const debouncedSave = useCallback((data) => {
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer);
    }

    const newTimer = setTimeout(() => {
      if (id && data) {
        updateResume(id, data);
        clearUnsavedChanges();
      }
    }, 2000);

    setAutoSaveTimer(newTimer);
    markUnsavedChanges();
  }, [id, updateResume, autoSaveTimer, markUnsavedChanges, clearUnsavedChanges]);

  const updateResumeData = (newData) => {
    setResumeData(newData);
    if (id) {
      debouncedSave(newData);
    }
  };

  // profile picture
  const handleProfilePicture = (e) => {
    const file = e.target.files[0];

    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newData = { ...resumeData, profilePicture: event.target.result };
        updateResumeData(newData);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type");
    }
  };

  const handleChange = (e) => {
    const newData = { ...resumeData, [e.target.name]: e.target.value };
    updateResumeData(newData);
  };

  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Cleanup auto-save timer
  useEffect(() => {
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
    };
  }, [autoSaveTimer]);

  // Loading state
  if (isLoading || resumesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Resume Not Found</h1>
          <p className="text-gray-600 mb-8">The resume you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-slate-600 text-white px-6 py-2 rounded hover:bg-slate-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ResumeContext.Provider
        value={{
          resumeData,
          setResumeData: updateResumeData,
          handleProfilePicture,
          handleChange,
        }}
      >
        <Meta
          title={`${currentResume?.metadata?.name || 'Resume Builder'} | ATSResume`}
          description="Create and edit your ATS-optimized resume with our professional resume builder. Build resumes that get noticed by employers and pass applicant tracking systems."
          keywords="ATS resume builder, resume editor, professional resume, job application, resume optimization"
        />
        
        <div className="min-h-screen bg-gray-50">
          <Header 
            currentResumeName={currentResume?.metadata?.name}
            className="exclude-print"
          />
          <div className="f-col gap-4 md:flex-row justify-evenly max-w-7xl md:mx-auto">
          {!formClose && (
            <form className="p-4 bg-slate-700 exclude-print md:max-w-[40%] md:h-screen md:overflow-y-scroll">
              <LoadUnload resumeId={id} hasUnsavedChanges={hasUnsavedChanges} />
              <PersonalInformation />
              <SocialMedia />
              <Summary />
              <Education />
              <WorkExperience />
              <Projects />
              {
                (resumeData.skills || []).map((skill, index) => (
                  <Skill
                    title={skill.title}
                    key={index}
                  />
                ))
              }
              <Language />
              <Certification />
            </form>
          )}
            <Preview />
          </div>
          <FormCP formClose={formClose} setFormClose={setFormClose} />
          <Print />
        </div>
      </ResumeContext.Provider>
    </>
  );
}
