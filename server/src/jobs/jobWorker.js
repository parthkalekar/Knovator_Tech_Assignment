const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const mongoose = require('mongoose');
const Job = require('../models/job.schema');

mongoose.connect(process.env.MONGODB_URI);

const redisUrl = process.env.REDIS_URL;

const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
});


const worker = new Worker(
  'job-import-queue',
  async job => {
    const jobData = job.data;
    const existing = await Job.findOne({ jobId: jobData.jobId });

    if (existing) {
      await Job.updateOne({ jobId: jobData.jobId }, jobData);
      return { status: 'updated' };
    } else {
      await Job.create(jobData);
      return { status: 'new' };
    }
  },
  { connection }
);

worker.on('failed', (job, err) => {
  console.error(`Job failed: ${job.id}`, err.message);
});

module.exports = worker;
