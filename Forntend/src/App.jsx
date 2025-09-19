import { useState } from 'react';
import Navigation from './components/Navigation';
import URLShortener from './components/URLShortener';
import Statistics from './components/Statistics';

function App() {
  const [currentPage, setCurrentPage] = useState('shortener');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'shortener' && <URLShortener />}
      {currentPage === 'statistics' && <Statistics />}
    </div>
  );
}

export default App;
