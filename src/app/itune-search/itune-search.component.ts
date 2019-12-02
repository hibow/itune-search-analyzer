import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
} from "rxjs/operators";
import { Song, Genre } from "../core/interfaces/song";
import { SongService } from "../song.service";
@Component({
  selector: "app-itune-search",
  templateUrl: "./itune-search.component.html",
  styleUrls: ["./itune-search.component.css"]
})
export class ItuneSearchComponent implements OnInit {
  results: any[] = [];
  queryField: FormControl = new FormControl();
  term: string;

  entry: Song[];
  selectedResult: any;
  onSelect(result: any): void {
    this.selectedResult = result;
    this.term = this.selectedResult.category;
    console.log('term:', this.term)
    this.queryField.setValue(this.term);
  }
  constructor(private songService: SongService) {}
  reset() {
    this.queryField.setValue("");
    this.term = '';
  }
  submitSearch() {
    if (this.term) {
      this.songService.searchSubmit(this.term).subscribe(res => {
        this.entry = res;
        console.log('result:', res);
      });
    }else {
      this.songService.resetSongs();
    }
    this.reset();
  }
  selectChange(args) {
    let tempid = parseInt(args.target.value);
    this.term = args.target.options[tempid].text;
    this.queryField.setValue(this.term);
  }

  ngOnInit() {
    this.queryField.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(queryField => {
        this.results = this.songService.filterList(queryField);
      });
  }
}
