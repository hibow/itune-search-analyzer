import { Component, OnInit } from "@angular/core";
import { Song } from "../core/interfaces/song";
import { SongService } from "../song.service";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { MultiDataSet, Label } from "ng2-charts";
@Component({
  selector: "app-artist-view",
  templateUrl: "./artist-view.component.html",
  styleUrls: ["./artist-view.component.css"]
})
export class ArtistViewComponent implements OnInit {
  songs: Song[];
  constructor(private songService: SongService) {}
  //donut data
  labelData: Label[] = ["BMW", "Ford", "Tesla"];
  dataSet: MultiDataSet = [[55, 25, 20]];
  //bar data
  barLabels: Label[] = [
    "Apple",
    "Banana",
    "Kiwifruit",
    "Blueberry",
    "Orange",
    "Grapes"
  ];
  barData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: "Best Fruits" }
  ];

  getSongs(): void {
    this.songService.getSongs().subscribe(songs => (this.songs = songs));
  }
  ngOnInit() {
    this.getSongs();
  }
}
