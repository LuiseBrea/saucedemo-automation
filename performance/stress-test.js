import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },   // sube de 0 a 10 usuarios
    { duration: '30s', target: 50 },   // sube de 10 a 50 usuarios
    { duration: '30s', target: 100 },  // sube de 50 a 100 usuarios
    { duration: '30s', target: 0 },    // baja de 100 a 0
  ],
};

export default function () {

  const headers = {
    'x-api-key': 'free_user_3FazgylqzJbSt7789LyzrsJPH81'
  };

  const response = http.get('https://reqres.in/api/users', { headers });

  check(response, {
    'status es 200': (r) => r.status === 200,
    'responde en menos de 3 segundos': (r) => r.timings.duration < 3000,
  });

  sleep(1);
}