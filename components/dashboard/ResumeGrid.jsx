import React from 'react';
import ResumeCard from './ResumeCard';
import CreateResumeButton from './CreateResumeButton';

const ResumeGrid = ({ resumes, onCreateResume, onDeleteResume, onDuplicateResume, onRenameResume }) => {
  const resumeArray = Object.values(resumes);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CreateResumeButton onCreate={onCreateResume} />
      
      {resumeArray.map((resume) => (
        <ResumeCard
          key={resume.metadata.id}
          resume={resume}
          onDelete={onDeleteResume}
          onDuplicate={onDuplicateResume}
          onRename={onRenameResume}
        />
      ))}
    </div>
  );
};

export default ResumeGrid;