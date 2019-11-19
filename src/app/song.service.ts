import { Injectable } from "@angular/core";
import { Song } from "./core/interfaces/song";
import { SONGS } from "./mocks/songs.mock";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SongService {
  private songsUrl = "api/songs"; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private http: HttpClient) {}
  getSongs(): Observable<Song[]> {
    return this.http
      .get<Song[]>(this.songsUrl)
      .pipe(catchError(this.handleError<Song[]>("getSongs", [])));
  }
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
  getSong(id: string): Observable<Song> {
    const url = `${this.songsUrl}/${id}`;
    console.log('song service!')
    return this.http
      .get<Song>(url)
      .pipe(catchError(this.handleError<Song>(`getsong id=${id}`)));
  }
}
