import { Injectable } from "@angular/core";
import { Song } from "./core/interfaces/song";
import { Songs } from "./core/interfaces/songs";
import { SONGS } from "./mocks/songs.mock";
import { Observable, of, BehaviorSubject, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import {
  SearchResults,
  SearchFeed,
  SearchEntries
} from "./core/interfaces/searchResult";
@Injectable({
  providedIn: "root"
})
export class SongService {
  private songsUrl = "api/songs"; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) {}
  // getSongs(): Observable<Song[]> {
  //   return this.http
  //     .get<Song[]>(this.songsUrl)
  //     .pipe(catchError(this.handleError<Song[]>("getSongs", [])));
  // }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  // getSong(id: string): Observable<Song> {
  //   const url = `${this.songsUrl}/${id}`;
  //   console.log("song service!");
  //   return this.http
  //     .get<Song>(url)
  //     .pipe(catchError(this.handleError<Song>(`getsong id=${id}`)));
  // }

  //search genre and should get autocomplete for the list
  searchSongs(term: string): Observable<Song[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    console.log("search term:", term);
  }

  songlist: Songs;
  private mySongs = new BehaviorSubject<Songs>(this.songlist);
  currentSongs = this.mySongs.asObservable();
  song: Song;
  term: string;
  // results: SearchResults;
  // feed: SearchFeed[];
  // entry: SearchEntries[];

  getSong(id: string): Observable<Song> {
    return this.getSongs().pipe(
      map((songs: Song[]) => songs.find(p => p.id === id))
    );
  }
  getSongs(): Observable<Song[]> {
    return this.currentSongs;
  }
  // searchPodcast(term: string): Observable<SearchResults> {
  //   return this.http.jsonp<SearchResults>(
  //     "https://itunes.apple.com/us/rss/topsongs/limit=10/genre=" +
  //       term +
  //       "/json",
  //     "callback"
  //   );
  // }
  search(term: string): Observable<Song[]> {
    let apiURL = `https://itunes.apple.com/us/rss/topsongs/limit=10/genre=${term}&callback=JSONP_CALLBACK`;
    return this.http
      .jsonp<SearchResults>(
        "https://itunes.apple.com/us/rss/topsongs/limit=10/genre=" +
          term +
          "/json",
        "callback"
      )
      .pipe(
        map(res => {
          console.log(res);
          let entryPoint = res.feed.entry;
          let newList = entryPoint.map(item => {
            // console.log(item);
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
          console.log("done!");
          return newList;
        })
      );
  }
}
