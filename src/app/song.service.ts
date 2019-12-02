import { Injectable } from "@angular/core";
import { Song, Genre } from "./core/interfaces/song";
import { Songs } from "./core/interfaces/songs";
import { Observable, of, BehaviorSubject} from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map} from "rxjs/operators";
import { Genres } from "../assets/data";
import {
  SearchResults,
} from "./core/interfaces/searchResult";
@Injectable({
  providedIn: "root"
})
export class SongService {
  songlist: Songs;
  private mySongs = new BehaviorSubject<Songs>(this.songlist);
  currentSongs = this.mySongs.asObservable();
  song: Song;
  term: string;
  options: Genre[] = Genres;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
  //search genre and should get autocomplete for the list
  filterList(value: string): any[] {
    if (!value.trim()) {
      return [];
    }
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.category.toLowerCase().includes(filterValue)
    );
  }

  private genreToID(term: string): string {
    for (let i = 0; i < Genres.length; i++) {
      if (Genres[i].category === term) {
        return Genres[i].id;
      }
    }
    return null;
  }

  getSong(id: string): Observable<Song> {
    return this.getSongs().pipe(
      map((songs: Song[]) => songs.find(p => p.id === id))
    );
  }
  getSongs(): Observable<Song[]> {
    return this.currentSongs;
  }
  resetSongs() {
    let emptylist:Song[] = [];
    this.mySongs.next(emptylist);
  }
  searchSubmit(term: string): Observable<Song[]> {
    let gid: string = this.genreToID(term);
    if (!gid) {
      return;
    }
    return this.http
      .jsonp<SearchResults>(
        "https://itunes.apple.com/us/rss/topsongs/limit=50/genre=" +
          gid +
          "/json",
        "callback"
      )
      .pipe(
        map(res => {
          let entryPoint = res.feed.entry;
          let newList = entryPoint.map(item => {
            this.song = {
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
            };
            return this.song;
          });
          this.mySongs.next(newList);
          return newList;
        })
      );
  }
}
