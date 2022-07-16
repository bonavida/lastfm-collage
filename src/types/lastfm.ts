interface RegisterTime {
  unixtime: string;
  '#text': number;
}

type Period = 'overall' | '7day' | '1month' | '3month' | '6month' | '12month';

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
  method: string;
  period: Period;
  limit: number;
  shuffle?: boolean;
}

export interface ParamFilters {
  [key: string]: string;
}

export interface ResponseArtist {
  name: string;
  mbid: string;
  url: string;
}

export interface ResponseAlbum {
  name: string;
  playcount: string;
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
