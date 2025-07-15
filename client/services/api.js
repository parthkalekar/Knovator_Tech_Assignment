export async function fetchImportLogs() {
  const res = await fetch('http://localhost:5000/api/import-logs');
  if (!res.ok) {
    throw new Error('Failed to fetch logs');
  }
  return res.json();
}


export async function importJobsFromUrl(url) {
  try {
    const res = await fetch('http://localhost:5000/api/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    })
    return true
  } catch (error) {
    return false
  }

}