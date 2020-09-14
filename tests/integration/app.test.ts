import request from 'supertest';
import app from '../../src/app';

test('Server status test', async (done) => {
  const response = await request(app).get('/api/lyrics');
  expect(response.status).toBe(200);
  done();
});
