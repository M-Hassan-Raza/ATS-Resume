import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHome, FaFileAlt, FaDownload } from 'react-icons/fa';

const Header = ({ currentResumeName = null, showExportButton = false, onExportAll = null, className = '' }) => {
  const router = useRouter();
  const isDashboard = router.pathname === '/dashboard';
  const isResumeBuilder = router.pathname === '/builder';

  const handleExportAll = () => {
    if (onExportAll) {
      onExportAll();
    }
  };

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <FaFileAlt className="text-slate-600 text-xl" />
              <span className="text-xl font-bold text-gray-900">ATSResume</span>
            </Link>
            
            {isResumeBuilder && currentResumeName && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600 font-medium">{currentResumeName}</span>
              </>
            )}
          </div>

          <nav className="flex items-center space-x-4">
            {!isDashboard && (
              <Link 
                href="/dashboard"
                className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-slate-600 hover:bg-slate-50 rounded transition-colors"
              >
                <FaHome size={16} />
                <span>Dashboard</span>
              </Link>
            )}
            
            {showExportButton && onExportAll && (
              <button
                onClick={handleExportAll}
                className="flex items-center space-x-1 px-3 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
              >
                <FaDownload size={16} />
                <span>Export All</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;