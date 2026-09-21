const request = require('supertest');
const app = require('../server');

describe('POST /tasks', () => {
  it('creates a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Buy coffee' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ title: 'Buy coffee', done: false });
    expect(res.body.id).toBeDefined();
  });

  it('rejects an empty task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: '' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/required/i);
  });
});
