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
        "rgba(241, 142, 44, 0.31)",
        "rgba(247, 247, 139, 0.72)",
        "rgba(44, 241, 241, 0.26)",
        "rgba(139, 247, 139, 0.2)",
        "rgba(191, 63, 191, 0.1)",
        "rgba(241, 44, 142, 0.53)",
        "rgba(44, 44, 241, 0.36)",
        'rgba(241, 44, 44, 0.49)',
        "rgba(142, 219, 137, 0.71)",
        "rgba(98, 207, 165, 0.63)"
      ],
      hoverBackgroundColor: [
        "rgba(241, 142, 44, 0.56)",
        "rgba(241, 241, 44, 0.61)",
        "rgba(44, 241, 241, 0.53)",
        "rgba(139, 247, 139, 0.72)",
        "rgba(247, 139, 247, 0.9)",
        "rgba(241, 44, 142, 0.76)",
        'rgba(44, 44, 241, 0.49)',
        'rgba(241, 44, 44, 0.49)',
        "rgba(104, 207, 98, 0.93)",
        "rgba(98, 207, 165, 0.88)"
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
      if (!this.songs) {
        return;
      }
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
  ngOnInit() {
    this.getArtists();
  }
}
