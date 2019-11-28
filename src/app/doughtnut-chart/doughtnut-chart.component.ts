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
      ]
    }
  ];
  // doughnutChartLabels: Label[] = ["BMW", "Ford", "Tesla"];
  // doughnutChartData: MultiDataSet = [[55, 25, 20]];
  constructor() {}

  ngOnInit() {}
}
