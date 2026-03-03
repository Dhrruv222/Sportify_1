const { URL } = require('node:url');
const { Queue, Worker } = require('bullmq');
const { ingestNews } = require('./news.service');

const DEFAULT_QUEUE_NAME = 'news-ingestion';

let queueInstance;
let workerInstance;

function getQueueName() {
  return process.env.NEWS_QUEUE_NAME || DEFAULT_QUEUE_NAME;
}

function isQueueEnabled() {
  return Boolean(process.env.REDIS_URL);
}

function getRedisConnection() {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    throw new Error('REDIS_URL is not configured');
  }

  const parsed = new URL(redisUrl);
  return {
    host: parsed.hostname,
    port: Number(parsed.port || 6379),
    username: parsed.username || undefined,
    password: parsed.password || undefined,
    tls: parsed.protocol === 'rediss:' ? {} : undefined,
    maxRetriesPerRequest: null,
  };
}

function getQueue() {
  if (!queueInstance) {
    queueInstance = new Queue(getQueueName(), {
      connection: getRedisConnection(),
    });
  }

  return queueInstance;
}

async function enqueueNewsIngestion(payload) {
  if (!isQueueEnabled()) {
    return {
      queued: false,
      mode: 'inline',
      accepted: true,
      reason: 'REDIS_URL is not configured',
    };
  }

  const queue = getQueue();
  const job = await queue.add('news:ingest', payload, {
    removeOnComplete: 100,
    removeOnFail: 100,
  });

  return {
    queued: true,
    mode: 'bullmq',
    jobId: String(job.id),
  };
}

function startNewsIngestionWorker() {
  if (!isQueueEnabled() || workerInstance) {
    return;
  }

  workerInstance = new Worker(
    getQueueName(),
    async (job) => ingestNews(job.data),
    { connection: getRedisConnection() },
  );

  workerInstance.on('failed', (job, error) => {
    console.error('[news-worker] job failed', {
      jobId: job?.id,
      name: job?.name,
      error: error?.message,
    });
  });
}

module.exports = {
  enqueueNewsIngestion,
  startNewsIngestionWorker,
};