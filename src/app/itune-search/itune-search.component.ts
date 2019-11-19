import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-itune-search",
  templateUrl: "./itune-search.component.html",
  styleUrls: ["./itune-search.component.css"]
})
export class ItuneSearchComponent implements OnInit {
  search = "search result";
  constructor() {}

  ngOnInit() {}
}
