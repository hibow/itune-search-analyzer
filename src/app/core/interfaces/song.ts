export interface Song {
  id: string; //track id
  name: string; //song track name
  imgUrl: string;
  albumName: string;
  price: string; //it was string
  recordLabel: string; //parse date
  audioUrl: string;
  artistName: string;
  releaseDate: string;
  ituneUrl: string;
  genre: string;
}
export interface Group {
  [key: string]: number;
}
