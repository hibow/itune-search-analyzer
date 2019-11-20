import { Component, OnInit, ɵɵsetComponentScope } from "@angular/core";
import { Song, Group } from "../core/interfaces/song";
import { SongService } from "../song.service";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { MultiDataSet, Label } from "ng2-charts";
@Component({
  selector: "app-price-view",
  templateUrl: "./price-view.component.html",
  styleUrls: ["./price-view.component.css"]
})
export class PriceViewComponent implements OnInit {
  songs: Song[];
  constructor(private songService: SongService) {}

  priceGroup: Group = {};
  //donut data
  labelData: Label[] = [];
  dataSet: MultiDataSet = [[]];
  //bar data
  barLabels: Label[] = [];
  barData: ChartDataSets[] = [
    {
      data: [],
      label: "Price per track",
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
            min: 0,
            stepSize: 1
          }
        }
      ]
    }
  };
  getPrices(): void {
    this.songService.getSongs().subscribe(songs => {
      this.songs = songs;
      this.songs.forEach(song => {
        if (!this.priceGroup[song.price]) {
          this.priceGroup[song.price] = 1;
        } else {
          this.priceGroup[song.price]++;
        }
      });
      for (let key in this.priceGroup) {
        this.labelData.push(key);
        this.dataSet[0].push(this.priceGroup[key]);
        this.barLabels.push(key);
        this.barData[0].data.push(this.priceGroup[key]);
      }
    });
  }
  ngOnInit() {
    this.getPrices();
  }
}
