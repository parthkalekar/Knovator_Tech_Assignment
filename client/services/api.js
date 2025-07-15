const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchImportLogs() {
  const res = await fetch(`${BASE_URL}/api/import-logs`);
  if (!res.ok) {
    throw new Error('Failed to fetch logs');
  }
  return res.json();
}


export async function importJobsFromUrl(url) {
  try {
    const res = await fetch(`${BASE_URL}/api/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });
    return true;
  } catch (error) {
    return false;
  }

}