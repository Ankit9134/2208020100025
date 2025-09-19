import { useState, useEffect } from 'react';

const Statistics = () => {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const mockStats = [
      {
        id: 1,
        shortUrl: 'http://localhost:3000/git123',
        originalUrl: 'https://github.com',
        createdAt: new Date('2025-09-19T15:00:00'),
        expiryDate: new Date('2025-09-19T15:30:00'),
        totalClicks: 5,
        clickData: [
          { timestamp: new Date('2025-09-19T15:05:00'), source: 'Direct', location: 'New York, US' },
          { timestamp: new Date('2025-09-19T15:10:00'), source: 'Social Media', location: 'London, UK' },
          { timestamp: new Date('2025-09-19T15:15:00'), source: 'Email', location: 'Tokyo, JP' }
        ]
      },
      {
        id: 2,
        shortUrl: 'http://localhost:3000/npm987',
        originalUrl: 'https://npmjs.com/package/react',
        createdAt: new Date('2025-09-19T15:05:00'),
        expiryDate: new Date('2025-09-19T15:35:00'),
        totalClicks: 3,
        clickData: [
          { timestamp: new Date('2025-09-19T15:08:00'), source: 'Search Engine', location: 'Berlin, DE' },
          { timestamp: new Date('2025-09-19T15:12:00'), source: 'Direct', location: 'Sydney, AU' }
        ]
      },
      {
        id: 3,
        shortUrl: 'http://localhost:3000/johnlink',
        originalUrl: 'https://www.linkedin.com/in/johndoe/',
        createdAt: new Date('2025-09-19T14:30:00'),
        expiryDate: new Date('2025-09-19T15:30:00'),
        totalClicks: 8,
        clickData: [
          { timestamp: new Date('2025-09-19T14:35:00'), source: 'LinkedIn', location: 'San Francisco, US' },
          { timestamp: new Date('2025-09-19T14:45:00'), source: 'Direct', location: 'Mumbai, IN' },
          { timestamp: new Date('2025-09-19T14:50:00'), source: 'Email', location: 'Toronto, CA' }
        ]
      },
      {
        id: 4,
        shortUrl: 'http://localhost:3000/nsxsadst456',
        originalUrl: 'https://www.medium.com/@nwddgesh',
        createdAt: new Date('2025-09-19T14:45:00'),
        expiryDate: new Date('2025-09-19T15:15:00'),
        totalClicks: 15,
        clickData: [
          { timestamp: new Date('2025-09-19T14:48:00'), source: 'Medium', location: 'Seattle, US' },
          { timestamp: new Date('2025-09-19T14:52:00'), source: 'Twitter', location: 'Paris, FR' },
          { timestamp: new Date('2025-09-19T14:58:00'), source: 'Direct', location: 'Delhi, IN' },
          { timestamp: new Date('2025-09-19T15:02:00'), source: 'Google', location: 'Amsterdam, NL' }
        ]
      },
      {
        id: 5,
        shortUrl: 'http://localhost:3000/net123',
        originalUrl: 'https://www.netflix.com/watch/xyz123',
        createdAt: new Date('2025-09-19T14:00:00'),
        expiryDate: new Date('2025-09-19T14:01:00'),
        totalClicks: 0,
        clickData: []
      }
    ];
    setStats(mockStats);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">URL Statistics</h1>
        
        {stats.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No shortened URLs found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-lg font-semibold mb-2">URL Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Short URL:</p>
                      <p className="font-mono text-blue-600">{stat.shortUrl}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Clicks:</p>
                      <p className="text-2xl font-bold text-green-600">{stat.totalClicks}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Created:</p>
                      <p>{stat.createdAt.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expires:</p>
                      <p>{stat.expiryDate.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-semibold mb-3">Click Details</h3>
                  {stat.clickData.length === 0 ? (
                    <p className="text-gray-500">No clicks recorded yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Timestamp</th>
                            <th className="text-left py-2">Source</th>
                            <th className="text-left py-2">Location</th>
                          </tr>
                        </thead>
                        <tbody>
                          {stat.clickData.map((click, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2">{click.timestamp.toLocaleString()}</td>
                              <td className="py-2">{click.source}</td>
                              <td className="py-2">{click.location}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;