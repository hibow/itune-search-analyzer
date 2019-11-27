import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { FormControl } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  startWith
} from "rxjs/operators";
import { Song, Genre } from "../core/interfaces/song";
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
  results: any[] = [];
  // filteredOptions: Genre[];
  queryField: FormControl = new FormControl();
  term: string;
  // results: SearchResults[];
  feed: SearchFeed[];
  entry: Song[];
  showDropDown: boolean;
  counter: number;
  private searchTerms = new Subject<string>();
  constructor(private songService: SongService) {}
  // Push a search term into the observable stream.
  search(term: string): void {
    console.log("search component");
    this.searchTerms.next(term);
  }
  submitSearch() {
    console.log("searching");
    this.songService.searchSubmit(this.term).subscribe(res => {
      this.entry = res;
      console.log("search entry:", this.entry);
    });
    this.queryField.setValue("");
  }
  selectChange(args) {
    console.log("select");
    this.term = args.target.value;
    console.log(this.term);
    this.queryField.setValue(this.term);
  }

  //convert term
  ngOnInit() {
    this.queryField.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(queryField => {
        this.results = this.songService.filterList(queryField);
        // .map(result => result.category);
        console.log(this.results);
      });
    // this.songs$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.songService.searchSongs(term))
    // );
    // this.getFiles();
  }
}
