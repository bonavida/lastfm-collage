import { lastfm } from 'config';

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
