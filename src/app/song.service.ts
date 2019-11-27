import { Injectable } from "@angular/core";
import { Song, Genre } from "./core/interfaces/song";
import { Songs } from "./core/interfaces/songs";
import { SONGS } from "./mocks/songs.mock";
import { Observable, of, BehaviorSubject, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import { Genres } from "../assets/data";
import {
  SearchResults,
  SearchFeed,
  SearchEntries
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
  // myControl = new FormControl();
  options: Genre[] = Genres;
  filteredOptions: Observable<string[]>;

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
  //search genre and should get autocomplete for the list
  filterList(value: string): Genre[] {
    console.log("filter start!");
    if (!value.trim()) {
      return [];
    }
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.category.toLowerCase().includes(filterValue)
    );
  }
  //search genre and should get autocomplete for the list
  searchSongs(term: string): Observable<Song[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    console.log("search term:", term);
  }
  private genreToID(term: string): string {
    console.log("term:", term);
    for (let i = 0; i < Genres.length; i++) {
      if (Genres[i].category === term) {
        console.log(Genres[i].id);
        return Genres[i].id;
      }
    }
    return "2";
  }
  searchGenre(searchText: string) {
    return Genres.filter(genre => {
      return genre.category.indexOf(searchText) != 1;
    });
  }

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
  searchSubmit(term: string): Observable<Song[]> {
    console.log("Strat submit!");
    let gid: string = this.genreToID(term);
    console.log("gid:", gid);
    let apiURL = `https://itunes.apple.com/us/rss/topsongs/limit=10/genre=${gid}&callback=JSONP_CALLBACK`;
    return this.http
      .jsonp<SearchResults>(
        "https://itunes.apple.com/us/rss/topsongs/limit=10/genre=" +
          gid +
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
