import request from 'supertest';
import app from '../src/app';

describe('Test the root path', () => {
  test('Server status test', async (done) => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    done();
  });
});
