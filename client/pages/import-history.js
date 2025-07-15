import { useEffect, useState } from 'react';
import { fetchImportLogs } from '../services/api';

export default function ImportHistoryPage() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImportLogs()
      .then(setLogs)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📦 Import History</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: '1rem', width: '100%' }}>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Timestamp</th>
            <th>Total Fetched</th>
            <th>Imported</th>
            <th>New</th>
            <th>Updated</th>
            <th>Failed</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id}>
              <td>{log.fileName}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.totalFetched}</td>
              <td>{log.totalImported}</td>
              <td>{log.newJobs}</td>
              <td>{log.updatedJobs}</td>
              <td>{log.failedJobs?.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
