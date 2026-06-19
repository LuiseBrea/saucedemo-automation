import { test, expect } from '@playwright/test';

test('obtener usuario 1', async ({ request }) => {

  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.name).toBe('Leanne Graham');

  expect(body.email).toBeTruthy();

});

test('usuario que no existe devuelve 404', async ({ request }) => {

  const response = await request.get('https://jsonplaceholder.typicode.com/users/999');

  expect(response.status()).toBe(404);

});

test('crear un nuevo usuario', async ({ request }) => {

  // Enviar datos para crear un usuario
  const response = await request.post('https://jsonplaceholder.typicode.com/users', {
    data: {
      name: 'Luis Brea',
      email: 'luisebreas@gmail.com',
      username: 'luisbrea-qa'
    }
  });

  // Verificar que se creó correctamente
  expect(response.status()).toBe(201);

  // Verificar que los datos son correctos
  const body = await response.json();
  expect(body.name).toBe('Luis Brea');
  expect(body.email).toBe('luisebreas@gmail.com');

});