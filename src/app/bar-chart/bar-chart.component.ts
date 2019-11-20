import { Component, OnInit, Input } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements OnInit {
  @Input() barChartOptions: ChartOptions;
  @Input() barChartLabels: Label[];
  barChartType: ChartType = "bar";
  barChartLegend = true;
  barChartPlugins = [];
  @Input() barChartData: ChartDataSets[];

  constructor() {}

  ngOnInit() {}
}
