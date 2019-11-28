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
  // songs$: Observable<Song[]>;
  results: any[] = [];
  queryField: FormControl = new FormControl();
  // queryField1: FormControl = new FormControl();
  term: string;
  // results: SearchResults[];
  // feed: SearchFeed[];
  entry: Song[];
  selectedResult: any;
  onSelect(result: any): void {
    this.selectedResult = result;
    this.term = this.selectedResult.category;
    console.log(this.term);
    this.queryField.setValue(this.term);
  }
  // showDropDown: boolean;
  // counter: number;
  // private searchTerms = new Subject<string>();
  constructor(private songService: SongService) {}
  // Push a search term into the observable stream.
  // search(term: string): void {
  //   console.log("search component");
  //   this.searchTerms.next(term);
  // }
  submitSearch() {
    console.log("searching");
    if (this.term) {
      this.songService.searchSubmit(this.term).subscribe(res => {
        this.entry = res;
        console.log("search entry:", this.entry);
      });
    }else {
      //clear current song list
      this.songService.resetSongs();
    }
    this.queryField.setValue("");
    this.term = '';
  }
  selectChange(args) {
    console.log("select");
    let tempid = parseInt(args.target.value);
    console.log(typeof tempid);
    this.term = args.target.options[tempid].text;
    console.log(this.term);
    this.queryField.setValue(this.term);
  }

  ngOnInit() {
    this.queryField.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(queryField => {
        this.results = this.songService.filterList(queryField);
        // .map(result => result.category);
        console.log(this.results);
      });
  }
}
