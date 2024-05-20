import request from 'supertest';
import app from '../index';
import { test, expect, beforeAll } from 'vitest';

let adminToken: string;
let userToken: string;

beforeAll(async () => {
  const loginResponse = await request(app)
    .post('/auth/login')
    .send({
      email: 'sadhuisaac1@gmail.com',
      password: '73429620Ce',
    });

  adminToken = loginResponse.body.data.token;
});

beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email: 'sadhuisaac3@gmail.com',
        password: '73429620Ce',
      });
  
      userToken = loginResponse.body.data.token;
  });

test('GET /shareddata/admin/:adminId should get shared data by admin ID', async () => {
  const adminId = 1;

  const response = await request(app)
    .get(`/shareddata/admin/${adminId}`)
    .set('Authorization', `Bearer ${adminToken}`);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('success', true);
  expect(Array.isArray(response.body.data)).toBe(true);
});

test('GET /shareddata/user/:userId should get shared data by user ID', async () => {
  const userId = 8;

  const response = await request(app)
    .get(`/shareddata/user/${userId}`)
    .set('Authorization', `Bearer ${userToken}`);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('success', true);
  expect(Array.isArray(response.body.data)).toBe(true);
});

test('GET /shareddata/saved/:sharedDataId should get shared data by saved data ID', async () => {
  const sharedDataId = 1;

  const response = await request(app)
    .get(`/sharedData/saved/${sharedDataId}`)
    .set('Authorization', `Bearer ${adminToken}`);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('success', true);
  expect(Array.isArray(response.body.data)).toBe(true);
});

test('GET /shareddata/shared/deleted should get shared data with deleted flag set to true', async () => {
  const response = await request(app)
    .get('/shareddata/shared/deleted')
    .set('Authorization', `Bearer ${adminToken}`);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('success', true);
  expect(Array.isArray(response.body.data)).toBe(true);
});

test('GET /shareddata/shared/deleted/:sharedDataId should get shared data detail with deleted flag set to true', async () => {
  const sharedDataId = 1;

  const response = await request(app)
    .get(`/shareddata/shared/deleted/${sharedDataId}`)
    .set('Authorization', `Bearer ${adminToken}`);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('success', true);
  expect(response.body).toHaveProperty('data');
});
