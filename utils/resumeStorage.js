import DefaultResumeData from '../components/utility/DefaultResumeData';

const STORAGE_KEY = 'ats_resumes';

const generateId = () => {
  return 'resume_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

const getEmptyStorage = () => ({
  resumes: {},
  activeResumeId: null,
  settings: {
    autoSave: true
  }
});

export const resumeStorage = {
  getAll: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return getEmptyStorage();
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading resumes from localStorage:', error);
      return getEmptyStorage();
    }
  },

  save: (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving resumes to localStorage:', error);
      return false;
    }
  },

  createResume: (name = 'Untitled Resume', resumeData = null) => {
    const storage = resumeStorage.getAll();
    const id = generateId();
    const timestamp = getCurrentTimestamp();
    
    const newResume = {
      ...(resumeData || DefaultResumeData),
      metadata: {
        id,
        name,
        created: timestamp,
        modified: timestamp,
        lastOpened: timestamp
      }
    };

    storage.resumes[id] = newResume;
    storage.activeResumeId = id;
    
    resumeStorage.save(storage);
    return { id, resume: newResume };
  },

  updateResume: (id, resumeData) => {
    const storage = resumeStorage.getAll();
    if (!storage.resumes[id]) return false;

    storage.resumes[id] = {
      ...resumeData,
      metadata: {
        ...storage.resumes[id].metadata,
        modified: getCurrentTimestamp()
      }
    };

    resumeStorage.save(storage);
    return true;
  },

  deleteResume: (id) => {
    const storage = resumeStorage.getAll();
    if (!storage.resumes[id]) return false;

    delete storage.resumes[id];
    
    if (storage.activeResumeId === id) {
      const remainingIds = Object.keys(storage.resumes);
      storage.activeResumeId = remainingIds.length > 0 ? remainingIds[0] : null;
    }

    resumeStorage.save(storage);
    return true;
  },

  duplicateResume: (id) => {
    const storage = resumeStorage.getAll();
    const sourceResume = storage.resumes[id];
    if (!sourceResume) return null;

    const newId = generateId();
    const timestamp = getCurrentTimestamp();
    
    const duplicatedResume = {
      ...sourceResume,
      metadata: {
        id: newId,
        name: sourceResume.metadata.name + ' (Copy)',
        created: timestamp,
        modified: timestamp,
        lastOpened: timestamp
      }
    };

    storage.resumes[newId] = duplicatedResume;
    resumeStorage.save(storage);
    
    return { id: newId, resume: duplicatedResume };
  },

  setActiveResume: (id) => {
    const storage = resumeStorage.getAll();
    if (!storage.resumes[id]) return false;

    storage.activeResumeId = id;
    storage.resumes[id].metadata.lastOpened = getCurrentTimestamp();
    
    resumeStorage.save(storage);
    return true;
  },

  getActiveResume: () => {
    const storage = resumeStorage.getAll();
    const activeId = storage.activeResumeId;
    if (!activeId || !storage.resumes[activeId]) return null;
    
    return { id: activeId, resume: storage.resumes[activeId] };
  },

  renameResume: (id, newName) => {
    const storage = resumeStorage.getAll();
    if (!storage.resumes[id]) return false;

    storage.resumes[id].metadata.name = newName;
    storage.resumes[id].metadata.modified = getCurrentTimestamp();
    
    resumeStorage.save(storage);
    return true;
  },

  importResume: (resumeData, name = null) => {
    const resumeName = name || resumeData.name || 'Imported Resume';
    return resumeStorage.createResume(resumeName, resumeData);
  },

  exportAllResumes: () => {
    const storage = resumeStorage.getAll();
    return storage.resumes;
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  migrateFromLegacy: (legacyResumeData) => {
    const storage = resumeStorage.getAll();
    
    if (Object.keys(storage.resumes).length === 0 && legacyResumeData) {
      const name = legacyResumeData.name || 'My Resume';
      return resumeStorage.createResume(name, legacyResumeData);
    }
    
    return null;
  },

  // Ensure all resume data has required structure
  validateResumeData: (resumeData) => {
    return {
      ...DefaultResumeData,
      ...resumeData,
      // Ensure all required arrays exist
      skills: Array.isArray(resumeData.skills) ? resumeData.skills : DefaultResumeData.skills,
      education: Array.isArray(resumeData.education) ? resumeData.education : DefaultResumeData.education,
      workExperience: Array.isArray(resumeData.workExperience) ? resumeData.workExperience : DefaultResumeData.workExperience,
      projects: Array.isArray(resumeData.projects) ? resumeData.projects : DefaultResumeData.projects,
      socialMedia: Array.isArray(resumeData.socialMedia) ? resumeData.socialMedia : DefaultResumeData.socialMedia,
      languages: Array.isArray(resumeData.languages) ? resumeData.languages : DefaultResumeData.languages,
      certifications: Array.isArray(resumeData.certifications) ? resumeData.certifications : DefaultResumeData.certifications,
    };
  }
};