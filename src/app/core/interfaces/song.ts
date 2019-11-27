export class Song {
  id: string; //track id :item.id.attributes["im:id"]
  name: string; //song track name  im:name.label
  imgUrl: string; //im:image array[2]
  albumName: string; //im: collection label
  price: string; //it was string im:price
  recordLabel: string; //right
  audioUrl: string; //link[1]
  artistName: string; //im:artist
  releaseDate: string; //im: releaseDate
  ituneUrl: string; //link[0]
  genre: string; //category
}
export interface Group {
  [key: string]: number;
}
export interface Genre {
  id: string;
  category: string;
}
/**
          id: item.id.attributes["im:id"],
          name: item["im:name"].label,
          artistName: item["im:artist"].label,
          imgUrl: item["im:image"][2].label,
          price: item["im:price"].label,
          albumName: item["im:collection"]["im:name"].label,
          releaseDate: item["im:releaseDate"].attributes.label,
          recordLabel: item.rights.label,
          audioUrl: item.link[1].attributes.href,
          ituneUrl: item.link[0].attributes.href,
          genre: item.category.attributes.label
 */
