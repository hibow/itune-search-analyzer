import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Song } from "./core/interfaces/song";
import { SongService } from "./song.service";
import {
  SearchResults,
  SearchFeed,
  SearchEntries
} from "./core/interfaces/searchResult";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "itune-search-analyzer";
}
