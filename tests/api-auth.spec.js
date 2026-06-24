import { test, expect } from '@playwright/test';

const API_KEY = 'free_user_3FazgylqzJbSt7789LyzrsJPH81';

test('obtener usuario con API key', async ({ request }) => {

  const response = await request.get('https://reqres.in/api/users/1', {
    headers: {
      'x-api-key': API_KEY
    }
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.id).toBe(1);
  expect(body.data.email).toBe('george.bluth@reqres.in');
  expect(body.data.first_name).toBe('George');

});

test('login y usar token para obtener datos', async ({ request }) => {

  const login = await request.post('https://reqres.in/api/login', {
    headers: {
      'x-api-key': API_KEY
    },
    data: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }
  });

  expect(login.status()).toBe(200);

  const loginBody = await login.json();
  const token = loginBody.token;

  expect(token).toBeTruthy();
  console.log('Token recibido:', token);

  const response = await request.get('https://reqres.in/api/users/2', {
    headers: {
      'x-api-key': API_KEY,
      'Authorization': 'Bearer ' + token
    }
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.id).toBe(2);

});

test('sin API key devuelve error', async ({ request }) => {

  const response = await request.get('https://reqres.in/api/users/1');

  // Sin key debe rechazarnos
  expect(response.status()).toBe(401);

});