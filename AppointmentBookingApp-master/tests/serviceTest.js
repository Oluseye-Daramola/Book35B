const request = require('supertest');
const app = require('../app');

describe('Service Endpoints', () => {
  test('GET /api/services should respond', async () => {
    const res = await request(app).get('/api/services');
    expect([401, 404]).toContain(res.statusCode);
  });
});