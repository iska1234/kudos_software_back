import request from 'supertest';
import app from '../index'; // Importa tu aplicación Express
import { test, expect } from 'vitest';


test('POST /auth/login should log in a user', async () => {
  const userData = {
    email: 'john1@example.com',
    password: 'password123',
  };

  const response = await request(app)
    .post('/auth/login')
    .send(userData);

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('success', true);
  expect(response.body).toHaveProperty('message', 'Inicio de sesión exitoso');
  expect(response.body).toHaveProperty('data');
  expect(response.body.data).toHaveProperty('token');
  expect(response.body.data).toHaveProperty('role');
});

test('POST /auth/logout should log out a user', async () => {
  const response = await request(app)
    .post('/auth/logout');

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('ok', true);
  expect(response.body).toHaveProperty('message', 'Logout exitoso');
});