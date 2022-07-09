interface RegisterTime {
  unixtime: string;
  '#text': number;
}

export interface ImageWeightMapper {
  [key: string]: number;
}

export interface Image {
  size: string;
  '#text': string;
}

export interface ResponseUser {
  id: number;
  type: string;
  name: string;
  realname: string;
  url: string;
  image: Image[];
  country: string;
  age: number;
  gender: string;
  subscriber: number;
  playcount: number;
  playlists: number;
  bootstrap: number;
  registered: RegisterTime;
}

export interface Filters {
  period?: string;
  limit: number;
  page?: number;
}

export interface ResponseArtist {
  name: string;
  mbid: string;
  url: string;
}

export interface ResponseAlbum {
  name: string;
  playcount: number;
  mbid: string;
  url: string;
  artist: ResponseArtist;
  image: Image[];
}

export interface ResponseAlbumAttrs {
  page: string;
  total: string;
  user: string;
  perPage: string;
  totalPages: string;
}

export interface ResponseTopAlbums {
  album: ResponseAlbum[];
  '@attr': ResponseAlbumAttrs;
}
