const { fetchJobsFromXMLFeed } = require('../services/jobFetcher');
const jobQueue = require('../jobs/jobQueue');
const ImportLog = require('../models/importLogs.schema');

const importJobs = async(req, res) => {
  const url = req.body.url;
  try {
    const jobs = await fetchJobsFromXMLFeed(url);
    let failed = [];

    for (let job of jobs) {
      try {
        await jobQueue.add('importJob', job);
      } catch (e) {
        failed.push({ jobId: job.jobId, reason: e.message });
      }
    }

    await ImportLog.create({
      fileName: url,
      totalFetched: jobs.length,
      totalImported: jobs.length - failed.length,
      newJobs: 0, // Will be updated in future (if worker returns status)
      updatedJobs: 0,
      failedJobs: failed,
    });

    res.status(200).json({ message: 'Jobs queued successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Import failed', error: err.message });
  }
}

const getImportLogs = async(req, res) => {
  try {
    const logs = await ImportLog.find().sort({ timestamp: -1 }).limit(20);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get logs', error: err.message });
  }
}

module.exports = { importJobs, getImportLogs };
