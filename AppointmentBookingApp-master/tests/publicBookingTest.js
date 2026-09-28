const request = require('supertest');
const app = require('../app');

describe('Public Booking Endpoints', () => {
  test('POST /api/public/appointments without body should fail validation', async () => {
    const res = await request(app).post('/api/public/appointments').send({});
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});