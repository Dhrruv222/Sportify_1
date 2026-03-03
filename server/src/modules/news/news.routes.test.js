const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../../app');

test('GET /api/v1/news validates query params', async () => {
  const response = await request(app).get('/api/v1/news?page=0');

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.success, false);
});

test('POST /api/v1/news validates payload', async () => {
  const response = await request(app)
    .post('/api/v1/news')
    .send({ sourceUrl: 'not-a-url' });

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.success, false);
});

test('POST /api/v1/news/internal/ingest validates payload', async () => {
  const response = await request(app)
    .post('/api/v1/news/internal/ingest')
    .send({ limit: 0 });

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.success, false);
});

test('POST /api/v1/news/internal/ingest requires internal API key when configured', async () => {
  const previousKey = process.env.INTERNAL_API_KEY;
  process.env.INTERNAL_API_KEY = 'test_internal_key';

  try {
    const response = await request(app)
      .post('/api/v1/news/internal/ingest')
      .send({ locale: 'en', limit: 1 });

    assert.equal(response.statusCode, 401);
    assert.equal(response.body.success, false);
  } finally {
    if (previousKey === undefined) {
      delete process.env.INTERNAL_API_KEY;
    } else {
      process.env.INTERNAL_API_KEY = previousKey;
    }
  }
});