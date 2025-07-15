// import { useEffect, useState } from 'react';
// import { fetchImportLogs } from '../services/api';
// import '../app/globals.css'; // ✅ Use styles folder or correct path to global CSS

// export default function ImportHistoryPage() {
//   const [logs, setLogs] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchImportLogs()
//       .then(setLogs)
//       .catch((err) => setError(err.message));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-6">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">📦 Import Logs </h1>
//           {error && (
//             <div className="bg-red-100 text-red-700 p-3 rounded-md shadow-sm">
//               {error}
//             </div>
//           )}
//         </div>

//         <div className="overflow-x-auto shadow rounded-lg bg-white">
//           <table className="min-w-full text-sm text-left text-gray-700">
//             <thead className="bg-gray-100 text-xs uppercase tracking-wider text-gray-600">
//               <tr>
//                 <th className="px-4 py-3">File Name</th>
//                 <th className="px-4 py-3">Timestamp</th>
//                 <th className="px-4 py-3">Total Fetched</th>
//                 <th className="px-4 py-3">Imported</th>
//                 <th className="px-4 py-3">New</th>
//                 <th className="px-4 py-3">Updated</th>
//                 <th className="px-4 py-3">Failed</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {logs.map((log) => (
//                 <tr key={log._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3">{log.fileName}</td>
//                   <td className="px-4 py-3">{new Date(log.timestamp).toLocaleString()}</td>
//                   <td className="px-4 py-3">{log.totalFetched}</td>
//                   <td className="px-4 py-3">{log.totalImported}</td>
//                   <td className="px-4 py-3">{log.newJobs}</td>
//                   <td className="px-4 py-3">{log.updatedJobs}</td>
//                   <td className="px-4 py-3">{log.failedJobs?.length ?? 0}</td>
//                 </tr>
//               ))}
//               {logs.length === 0 && !error && (
//                 <tr>
//                   <td colSpan="7" className="text-center py-6 text-gray-500">
//                     No import logs found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { fetchImportLogs, importJobsFromUrl } from '../services/api';
import '../app/globals.css'; // ✅ adjust if needed

export default function ImportHistoryPage() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [importUrl, setImportUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    fetchImportLogs()
      .then(setLogs)
      .catch((err) => setError(err.message));
  };

  const handleImport = async () => {
    if (!importUrl) return;
    setIsLoading(true);
    setError(null);
    try {
      await importJobsFromUrl(importUrl); // 🛠️ Custom API call
      setShowModal(false);
      setImportUrl('');
      loadLogs(); // Refresh logs
    } catch (err) {
      setError(err.message || 'Import failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">📦 Import Logs</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Import Jobs
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md shadow-sm">
            {error}
          </div>
        )}

        <div className="overflow-x-auto shadow rounded-lg bg-white">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase tracking-wider text-gray-600">
              <tr>
                <th className="px-4 py-3">File Name</th>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Total Fetched</th>
                <th className="px-4 py-3">Imported</th>
                <th className="px-4 py-3">New</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Failed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{log.fileName}</td>
                  <td className="px-4 py-3">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-3">{log.totalFetched}</td>
                  <td className="px-4 py-3">{log.totalImported}</td>
                  <td className="px-4 py-3">{log.newJobs}</td>
                  <td className="px-4 py-3">{log.updatedJobs}</td>
                  <td className="px-4 py-3">{log.failedJobs?.length ?? 0}</td>
                </tr>
              ))}
              {logs.length === 0 && !error && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No import logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Import Jobs from URL</h2>
            <input
              type="url"
              placeholder="Enter import URL"
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
              className="w-full border text-gray-900 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={isLoading}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Importing...' : 'Import'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
