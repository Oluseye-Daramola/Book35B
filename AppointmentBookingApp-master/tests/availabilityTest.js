const request = require('supertest');
const app = require('../app');

describe('Availability Endpoints', () => {
  test('GET /api/availability should respond', async () => {
    const res = await request(app).get('/api/availability');
    expect([401, 404]).toContain(res.statusCode);
  });
});