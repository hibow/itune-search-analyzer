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
  selectedHero: Song;
  onSelect(song: Song): void {
    console.log(song.name);
    //  this.selectedSong = song;
  }
  constructor(private songService: SongService) {}
  // getSongs(): void {
  //   this.songs = this.songService.getSongs();
  // }
  getSongs(): void {
    console.log("I am here");
    // this.songService.getSongs().subscribe(songs => (this.songs = songs));
    this.songService.currentSongs.subscribe(songs => {
      console.log("what is:", songs);
      this.songs = songs;
    });
  }
  ngOnInit() {
    this.getSongs();
  }
}
