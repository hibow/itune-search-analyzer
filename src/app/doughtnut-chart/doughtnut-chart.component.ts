import { Component, OnInit, Input } from "@angular/core";
import { ChartType } from "chart.js";
import { MultiDataSet, Label } from "ng2-charts";

@Component({
  selector: "app-doughtnut-chart",
  templateUrl: "./doughtnut-chart.component.html",
  styleUrls: ["./doughtnut-chart.component.css"]
})
export class DoughtnutChartComponent implements OnInit {
  @Input() doughnutChartLabels: Label[];
  @Input() doughnutChartData: MultiDataSet[];
  doughnutChartType: ChartType = "doughnut";
  private donutColors = [
    {
      backgroundColor: [
        "rgba(110, 114, 20, 1)",
        "rgba(118, 183, 172, 1)",
        "rgba(0, 148, 97, 1)",
        "rgba(129, 78, 40, 1)",
        "rgba(129, 199, 111, 1)"
      ]
    }
  ];
  // doughnutChartLabels: Label[] = ["BMW", "Ford", "Tesla"];
  // doughnutChartData: MultiDataSet = [[55, 25, 20]];
  constructor() {}

  ngOnInit() {}
}
