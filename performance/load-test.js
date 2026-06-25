import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {

  const headers = {
    'x-api-key': 'free_user_3FazgylqzJbSt7789LyzrsJPH81'
  };

  const response = http.get('https://reqres.in/api/users', { headers });

  check(response, {
    'status es 200': (r) => r.status === 200,
    'responde en menos de 2 segundos': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}