import React, { useState } from 'react';
import { useResumes } from '../contexts/ResumesContext';
import Header from '../components/navigation/Header';
import ResumeGrid from '../components/dashboard/ResumeGrid';
import Meta from '../components/meta/Meta';
import { FaSearch, FaFileImport } from 'react-icons/fa';

const Dashboard = () => {
  const {
    resumes,
    loading,
    createResume,
    deleteResume,
    duplicateResume,
    renameResume,
    importResume
  } = useResumes();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredResumes = Object.values(resumes).filter(resume =>
    resume.metadata.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredResumesObj = filteredResumes.reduce((acc, resume) => {
    acc[resume.metadata.id] = resume;
    return acc;
  }, {});

  const handleCreateResume = (name) => {
    return createResume(name);
  };

  const handleDeleteResume = (id) => {
    deleteResume(id);
  };

  const handleDuplicateResume = (id) => {
    duplicateResume(id);
  };

  const handleRenameResume = (id, newName) => {
    renameResume(id, newName);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const resumeData = JSON.parse(e.target.result);
        const name = resumeData.name || 'Imported Resume';
        importResume(resumeData, name);
      } catch (error) {
        alert('Error importing resume. Please check the file format.');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    
    event.target.value = '';
  };

  const handleExportAll = () => {
    if (Object.keys(resumes).length === 0) {
      alert('No resumes to export');
      return;
    }

    const allResumes = Object.values(resumes);
    const exportData = {
      resumes: allResumes,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const jsonData = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ATSResume_All_Resumes_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your resumes...</p>
        </div>
      </div>
    );
  }

  const resumeCount = Object.keys(resumes).length;

  return (
    <>
      <Meta
        title="Dashboard | ATSResume - Manage Your Resumes"
        description="Manage all your ATS-optimized resumes in one place. Create, edit, duplicate, and organize your professional resumes with ATSResume."
        keywords="resume dashboard, resume manager, ATS resume builder, multiple resumes, resume organization"
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header 
          showExportButton={resumeCount > 0}
          onExportAll={handleExportAll}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Resumes</h1>
            <p className="text-gray-600">
              {resumeCount === 0 
                ? 'Create your first professional resume' 
                : `You have ${resumeCount} resume${resumeCount !== 1 ? 's' : ''}`
              }
            </p>
          </div>

          {resumeCount > 0 && (
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resumes by name, position, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500"
                />
              </div>
              
              <div className="flex items-center">
                <label className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <FaFileImport className="text-gray-600" />
                  <span className="text-gray-700">Import Resume</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          <ResumeGrid
            resumes={filteredResumesObj}
            onCreateResume={handleCreateResume}
            onDeleteResume={handleDeleteResume}
            onDuplicateResume={handleDuplicateResume}
            onRenameResume={handleRenameResume}
          />

          {resumeCount > 0 && filteredResumes.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No resumes found matching "{searchTerm}"</p>
              <p className="text-gray-400 mt-2">Try a different search term</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;