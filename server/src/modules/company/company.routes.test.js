const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../../app');

test('GET /api/v1/company/employees requires x-user-id header', async () => {
  const response = await request(app).get('/api/v1/company/employees');

  assert.equal(response.statusCode, 401);
  assert.equal(response.body.success, false);
});

test('POST /api/v1/company/employees validates payload', async () => {
  const response = await request(app)
    .post('/api/v1/company/employees')
    .set('x-user-id', 'company-owner-id')
    .send({ email: 'invalid-email' });

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.success, false);
});
