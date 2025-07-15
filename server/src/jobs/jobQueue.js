const { Queue } = require('bullmq');
const IORedis = require('ioredis');

const redisUrl = process.env.REDIS_URL;

const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
});

const jobQueue = new Queue('job-import-queue', { connection });

module.exports = jobQueue;
