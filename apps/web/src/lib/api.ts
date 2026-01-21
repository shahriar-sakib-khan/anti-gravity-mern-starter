import ky from 'ky';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const api = ky.create({
  prefixUrl: API_URL,
  retry: 0,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('auth-storage')
          ? JSON.parse(localStorage.getItem('auth-storage')!).state.token
          : null;

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});
