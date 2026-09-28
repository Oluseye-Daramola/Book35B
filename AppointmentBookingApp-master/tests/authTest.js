const request = require('supertest');
const app = require('../app');

describe('Authentication Endpoints', () => {
  test('GET /api/health should return 200 OK', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});