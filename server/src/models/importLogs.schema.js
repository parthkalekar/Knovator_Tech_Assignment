const mongoose = require('mongoose');

const ImportLogSchema = new mongoose.Schema({
  fileName: String,
  timestamp: { type: Date, default: Date.now },
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: [
    {
      jobId: String,
      reason: String,
    },
  ],
});

const ImportLog = mongoose.model('ImportLog', ImportLogSchema);
module.exports = ImportLog;
