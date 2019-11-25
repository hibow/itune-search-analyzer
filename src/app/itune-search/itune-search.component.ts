import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Song } from "../core/interfaces/song";
import { SongService } from "../song.service";
import {
  SearchResults,
  SearchFeed,
  SearchEntries
} from "../core/interfaces/searchResult";
@Component({
  selector: "app-itune-search",
  templateUrl: "./itune-search.component.html",
  styleUrls: ["./itune-search.component.css"]
})
export class ItuneSearchComponent implements OnInit {
  songs$: Observable<Song[]>;
  // files: any = [];
  term: string;
  results: SearchResults[];
  feed: SearchFeed[];
  entry: Song[];
  private searchTerms = new Subject<string>();
  constructor(private songService: SongService) {}
  // Push a search term into the observable stream.
  searchSong(term: string): void {
    console.log("search component");
    this.searchTerms.next(term);
  }
  submitSearch() {
    console.log("searching");
    this.songService.search(this.term).subscribe(res => {
      this.entry = res;
      console.log("search entry:", this.entry);
    });
  }
  //convert term
  ngOnInit(): void {
    this.songs$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.songService.searchSongs(term))
    );
    // this.getFiles();
  }
}
