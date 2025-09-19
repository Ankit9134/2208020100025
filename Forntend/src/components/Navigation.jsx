import React from "react";
const Navigation = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-blue-600">URL Shortener</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentPage('shortener')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === 'shortener'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Shorten URL
              </button>
              <button
                onClick={() => setCurrentPage('statistics')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === 'statistics'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Statistics
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;