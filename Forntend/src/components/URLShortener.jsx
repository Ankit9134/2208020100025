import { useState } from 'react';
import axios from 'axios';
import { FiCopy, FiExternalLink, FiPlus, FiTrash2 } from 'react-icons/fi';

const URLShortener = () => {
  const [urls, setUrls] = useState([{ longUrl: '', validity: 30, shortcode: '' }]);
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState({});

  const validateUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return urlPattern.test(url);
  };

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', validity: 30, shortcode: '' }]);
    }
  };

  const removeUrlField = (index) => {
    if (urls.length > 1) {
      const updated = urls.filter((_, i) => i !== index);
      setUrls(updated);
    }
  };

  const handleShorten = async () => {
    const newErrors = {};
    
    urls.forEach((url, index) => {
      if (url.longUrl && !validateUrl(url.longUrl)) {
        newErrors[`url_${index}`] = 'Please enter a valid URL';
      }
      if (url.validity < 1 || url.validity > 60) {
        newErrors[`validity_${index}`] = 'Validity must be between 1-60 minutes';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/shorten', { urls });
      setResults(res.data);
      setErrors({});
    } catch (err) {
      alert('Error creating short URLs!');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">URL Shortener</h1>
          <p className="text-gray-600">Transform long URLs into short, shareable links</p>
        </div>
        
        {/* URL Shortener Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Shorten up to 5 URLs</h2>
          </div>
          <div className="space-y-6">
            {urls.map((url, index) => (
              <div key={index} className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-10 hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 font-medium">URL{index + 1}</span>
                  </div>
                  {urls.length > 1 && (
                    <button
                      onClick={() => removeUrlField(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remove URL"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Original URL</label>
                    <input
                      type="text"
                      value={url.longUrl}
                      onChange={(e) => handleChange(index, 'longUrl', e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="https://example.com/very-long-url"
                    />
                    {errors[`url_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`url_${index}`]}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
                    <div>
                      <label className="block text-sm font-medium mb-2">Validity (minutes)</label>
                      <input
                        type="number"
                        value={url.validity}
                        onChange={(e) => handleChange(index, 'validity', parseInt(e.target.value))}
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        min="1"
                        max="60"
                      />
                      {errors[`validity_${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`validity_${index}`]}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Custom Shortcode</label>
                      <input
                        type="text"
                        value={url.shortcode}
                        onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
                        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="custom-code"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex gap-4">
              {urls.length < 5 && (
                <button
                  onClick={addUrlField}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <FiPlus size={18} />
                  Add Another URL
                </button>
              )}
              
              <button
                onClick={handleShorten}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Shorten URLs
              </button>
            </div>
          </div>
        </div>
        {results.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-xl font-semibold mb-6">Shortened URLs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((result) => (
                <div key={result.id} className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:bg-white transition-colors">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Original URL:</p>
                    <div className="flex items-start justify-between">
                      <p className="text-blue-600 break-all text-sm flex-1 pr-2">{result.originalUrl}</p>
                      <a
                        href={result.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600 flex-shrink-0"
                        title="Open original URL"
                      >
                        <FiExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Short URL:</p>
                    <div className="flex items-center justify-between">
                      <a 
                        href={result.shortUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-mono text-green-600 text-sm break-all flex-1 pr-2"
                      >
                        {result.shortUrl}
                      </a>
                      <button
                        onClick={() => copyToClipboard(result.shortUrl)}
                        className="text-gray-500 hover:text-blue-600 flex-shrink-0"
                        title="Copy to clipboard"
                      >
                        <FiCopy size={16} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600">
                    Expires in {result.validity} minutes
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default URLShortener;