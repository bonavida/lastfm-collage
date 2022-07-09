/** Utils */
import { generateApiSignature } from '@utils/lastfm';
/** Constants */
import {
  LASTFM_AUTH_URL,
  LASTFM_API_KEY,
  LASTFM_API_URL,
  LASTFM_CALLBACK_URL,
} from '@constants/lastfm';

export const signIn = () => {
  if (!LASTFM_API_KEY) return;
  const url = `${LASTFM_AUTH_URL}/?api_key=${LASTFM_API_KEY}&cb=${LASTFM_CALLBACK_URL}`;
  window.location.href = url;
};

export const getSession = async (token: string) => {
  const authParams = {
    method: 'auth.getSession',
    token,
    api_key: LASTFM_API_KEY,
  };
  const apiSignature = generateApiSignature(authParams);
  const params = {
    ...authParams,
    api_sig: apiSignature,
    format: 'json',
  };
  const url = `${LASTFM_API_URL}?${new URLSearchParams(params).toString()}`;
  // return http
  //   .get<{ session: Session }>(`${apiUrl}`, { params })
  //   .then(res => res.data.session);

  const response = await fetch(url, {
    method: 'GET',
  });
  return await response.json();
};
