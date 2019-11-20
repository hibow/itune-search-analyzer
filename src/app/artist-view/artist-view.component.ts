import { Component, OnInit } from "@angular/core";
import { Song, Group } from "../core/interfaces/song";
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

  artistGroup: Group = {};
  //donut data
  labelData: Label[] = [];
  dataSet: MultiDataSet = [[]];
  //bar data
  barLabels: Label[] = [];
  barData: ChartDataSets[] = [
    {
      data: [],
      label: "tracks per artist",
      backgroundColor: [
        "rgba(110, 114, 20, 1)",
        "rgba(118, 183, 172, 1)",
        "rgba(0, 148, 97, 1)",
        "rgba(129, 78, 40, 1)",
        "rgba(129, 199, 111, 1)"
      ],
      hoverBackgroundColor: [
        "rgba(110, 114, 25, 1)",
        "rgba(101, 200, 162, 1)",
        "rgba(0, 148, 97, 1)",
        "rgba(129, 78, 40, 1)",
        "rgba(129, 199, 111, 1)"
      ]
    }
  ];
  barOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    scales: {
      yAxes: [
        {
          ticks: {
            // max: 5,
            min: 0,
            stepSize: 1
          }
        }
      ]
    }
  };
  getArtists(): void {
    this.songService.getSongs().subscribe(songs => {
      this.songs = songs;
      this.songs.forEach(song => {
        if (!this.artistGroup[song.artistName]) {
          this.artistGroup[song.artistName] = 1;
        } else {
          this.artistGroup[song.artistName]++;
        }
      });
      for (let key in this.artistGroup) {
        this.labelData.push(key);
        this.dataSet[0].push(this.artistGroup[key]);
        this.barLabels.push(key);
        this.barData[0].data.push(this.artistGroup[key]);
      }
    });
  }
  // getSongs(): void {
  //   this.songService.getSongs().subscribe(songs => (this.songs = songs));
  // }
  ngOnInit() {
    this.getArtists();
  }
}
