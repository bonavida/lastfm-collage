const lastfm = {
  apiUrl: 'http://ws.audioscrobbler.com/2.0',
  authUrl: 'https://www.last.fm/api/auth',
  auth: {
    apiKey: process.env.REACT_APP_API_KEY || '',
    sharedSecret: process.env.REACT_APP_SHARED_SECRET || '',
  },
};

export { lastfm };
