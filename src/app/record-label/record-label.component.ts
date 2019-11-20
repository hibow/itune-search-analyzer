import { Component, OnInit } from "@angular/core";
import { Song, Group } from "../core/interfaces/song";
import { SongService } from "../song.service";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { MultiDataSet, Label } from "ng2-charts";
@Component({
  selector: "app-record-label",
  templateUrl: "./record-label.component.html",
  styleUrls: ["./record-label.component.css"]
})
export class RecordLabelComponent implements OnInit {
  songs: Song[];
  constructor(private songService: SongService) {}
  recordGroup: Group = {};
  //donut data
  labelData: Label[] = [];
  dataSet: MultiDataSet = [[]];
  //bar data
  barLabels: Label[] = [];
  barData: ChartDataSets[] = [
    {
      data: [],
      label: "tracks per record label",
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
    aspectRatio: 1.5,
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
  getRecords(): void {
    this.songService.getSongs().subscribe(songs => {
      this.songs = songs;
      this.songs.forEach(song => {
        if (!this.recordGroup[song.recordLabel]) {
          this.recordGroup[song.recordLabel] = 1;
        } else {
          this.recordGroup[song.recordLabel]++;
        }
      });
      for (let key in this.recordGroup) {
        this.labelData.push(key);
        this.dataSet[0].push(this.recordGroup[key]);
        this.barLabels.push(key);
        this.barData[0].data.push(this.recordGroup[key]);
      }
    });
  }
  ngOnInit() {
    this.getRecords();
  }
}
