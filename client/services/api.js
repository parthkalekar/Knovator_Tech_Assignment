export async function fetchImportLogs() {
  const res = await fetch('http://localhost:5000/api/import-logs');
  if (!res.ok) {
    throw new Error('Failed to fetch logs');
  }
  return res.json();
}
