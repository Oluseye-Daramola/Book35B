const request = require('supertest');
const app = require('../app');

describe('Appointment Endpoints', () => {
  test('GET /api/appointments should respond', async () => {
    const res = await request(app).get('/api/appointments');
    expect([401, 404]).toContain(res.statusCode);
  });
});