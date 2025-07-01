import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { resumeStorage } from '../utils/resumeStorage';

const ResumesContext = createContext();

const initialState = {
  resumes: {},
  activeResumeId: null,
  loading: true,
  hasUnsavedChanges: false,
  autoSaveEnabled: true
};

const resumesReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_RESUMES':
      return {
        ...state,
        resumes: action.payload.resumes,
        activeResumeId: action.payload.activeResumeId,
        loading: false
      };
    
    case 'CREATE_RESUME':
      return {
        ...state,
        resumes: {
          ...state.resumes,
          [action.payload.id]: action.payload.resume
        },
        activeResumeId: action.payload.id,
        hasUnsavedChanges: false
      };
    
    case 'UPDATE_RESUME':
      return {
        ...state,
        resumes: {
          ...state.resumes,
          [action.payload.id]: action.payload.resume
        },
        hasUnsavedChanges: false
      };
    
    case 'DELETE_RESUME':
      const { [action.payload.id]: deleted, ...remainingResumes } = state.resumes;
      const remainingIds = Object.keys(remainingResumes);
      return {
        ...state,
        resumes: remainingResumes,
        activeResumeId: remainingIds.length > 0 ? remainingIds[0] : null
      };
    
    case 'SET_ACTIVE_RESUME':
      return {
        ...state,
        activeResumeId: action.payload.id,
        hasUnsavedChanges: false
      };
    
    case 'MARK_UNSAVED_CHANGES':
      return {
        ...state,
        hasUnsavedChanges: true
      };
    
    case 'CLEAR_UNSAVED_CHANGES':
      return {
        ...state,
        hasUnsavedChanges: false
      };
    
    default:
      return state;
  }
};

export const ResumesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumesReducer, initialState);

  useEffect(() => {
    const storage = resumeStorage.getAll();
    dispatch({
      type: 'LOAD_RESUMES',
      payload: storage
    });
  }, []);

  const createResume = (name, resumeData = null) => {
    const result = resumeStorage.createResume(name, resumeData);
    if (result) {
      dispatch({
        type: 'CREATE_RESUME',
        payload: result
      });
      return result;
    }
    return null;
  };

  const updateResume = (id, resumeData) => {
    const success = resumeStorage.updateResume(id, resumeData);
    if (success) {
      dispatch({
        type: 'UPDATE_RESUME',
        payload: { id, resume: resumeStorage.getAll().resumes[id] }
      });
      return true;
    }
    return false;
  };

  const deleteResume = (id) => {
    const success = resumeStorage.deleteResume(id);
    if (success) {
      dispatch({
        type: 'DELETE_RESUME',
        payload: { id }
      });
      return true;
    }
    return false;
  };

  const duplicateResume = (id) => {
    const result = resumeStorage.duplicateResume(id);
    if (result) {
      dispatch({
        type: 'CREATE_RESUME',
        payload: result
      });
      return result;
    }
    return null;
  };

  const setActiveResume = useCallback((id) => {
    const success = resumeStorage.setActiveResume(id);
    if (success) {
      dispatch({
        type: 'SET_ACTIVE_RESUME',
        payload: { id }
      });
      return true;
    }
    return false;
  }, []);

  const renameResume = (id, newName) => {
    const success = resumeStorage.renameResume(id, newName);
    if (success) {
      dispatch({
        type: 'UPDATE_RESUME',
        payload: { id, resume: resumeStorage.getAll().resumes[id] }
      });
      return true;
    }
    return false;
  };

  const importResume = (resumeData, name = null) => {
    const result = resumeStorage.importResume(resumeData, name);
    if (result) {
      dispatch({
        type: 'CREATE_RESUME',
        payload: result
      });
      return result;
    }
    return null;
  };

  const getActiveResume = () => {
    if (!state.activeResumeId || !state.resumes[state.activeResumeId]) {
      return null;
    }
    return {
      id: state.activeResumeId,
      resume: state.resumes[state.activeResumeId]
    };
  };

  const markUnsavedChanges = () => {
    dispatch({ type: 'MARK_UNSAVED_CHANGES' });
  };

  const clearUnsavedChanges = () => {
    dispatch({ type: 'CLEAR_UNSAVED_CHANGES' });
  };

  const autoSave = (id, resumeData) => {
    if (state.autoSaveEnabled) {
      updateResume(id, resumeData);
    }
  };

  const value = {
    ...state,
    createResume,
    updateResume,
    deleteResume,
    duplicateResume,
    setActiveResume,
    renameResume,
    importResume,
    getActiveResume,
    markUnsavedChanges,
    clearUnsavedChanges,
    autoSave
  };

  return (
    <ResumesContext.Provider value={value}>
      {children}
    </ResumesContext.Provider>
  );
};

export const useResumes = () => {
  const context = useContext(ResumesContext);
  if (!context) {
    throw new Error('useResumes must be used within a ResumesProvider');
  }
  return context;
};