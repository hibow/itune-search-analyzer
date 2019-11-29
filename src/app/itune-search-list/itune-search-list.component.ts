import { Component, OnInit, Input } from "@angular/core";
import { Song } from "../core/interfaces/song";
import { SongService } from "../song.service";
@Component({
  selector: "app-itune-search-list",
  templateUrl: "./itune-search-list.component.html",
  styleUrls: ["./itune-search-list.component.css"]
})
export class ItuneSearchListComponent implements OnInit {
  songs: Song[];
  onSelect(song: Song): void {
    // console.log(song.name);
  }
  constructor(private songService: SongService) {}
  getSongs(): void {
    this.songService.currentSongs.subscribe(songs => {
      this.songs = songs;
    });
  }
  ngOnInit() {
    this.getSongs();
  }
}
