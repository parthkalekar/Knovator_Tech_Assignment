const { fetchJobsFromXMLFeed } = require('../services/jobFetcher');
const jobQueue = require('../jobs/jobQueue');
const ImportLog = require('../models/importLogs.schema');
const Job = require('../models/job.schema');

const importJobs = async(req, res) => {
  const url = req.body.url;
  try {
    const jobs = await fetchJobsFromXMLFeed(url);
    let failed = [];
    let newCount = 0;
    let updatedCount = 0;
    for (let jobData of jobs) {
      try {
        const modifiedJobData = {
          jobId: jobData.jobId?._,
          title: jobData.title,
          company: jobData.company,
          description: jobData.description,
          url: jobData.url,
        }
        const existing = await Job.findOne({ jobId: jobData.jobId?._ });
        if (existing) {
          await Job.updateOne({ jobId: jobData.jobId?._ }, modifiedJobData);
          updatedCount++;
        } else {
          await Job.create(modifiedJobData);
          newCount++;
        }
      } catch (err) {
        failed.push({ jobId: jobData.jobId, reason: err.message });
      }
    }

    await ImportLog.create({
      fileName: url,
      totalFetched: jobs.length,
      totalImported: jobs.length - failed.length,
      newJobs: newCount, // Will be updated in future (if worker returns status)
      updatedJobs: updatedCount,
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
