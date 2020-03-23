import { lastfm } from 'config';
import http from './core/http';

export const login = () => {
  const {
    authUrl,
    auth: { apiKey },
  } = lastfm;
  if (authUrl && apiKey) {
    const url = `${authUrl}/?api_key=${apiKey}`;
    window.location.href = url;
  }
};

export const getSession = (token: string, apiSig: string) => {
  const {
    apiUrl,
    auth: { apiKey },
  } = lastfm;
  const params = {
    method: 'auth.getSession',
    token,
    api_key: apiKey,
    api_sig: apiSig,
    format: 'json',
  };
  return http.get(`${apiUrl}`, { params }).then(res => res.data);
};
