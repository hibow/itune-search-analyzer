import { Component, OnInit, Input } from "@angular/core";
import { Song } from "../core/interfaces/song";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { SongService } from "../song.service";

@Component({
  selector: "app-result-detail",
  templateUrl: "./result-detail.component.html",
  styleUrls: ["./result-detail.component.css"]
})
export class ResultDetailComponent implements OnInit {
  @Input() song: Song;
  constructor(
    private route: ActivatedRoute,
    private songService: SongService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.params;
    routeParams.subscribe(params => {
      console.log(params.id);
      const id = params.id;
      this.getSong(id);
    });
  }
  getSong(id): void {
    // const id = this.route.snapshot.paramMap.get("id");
    console.log("get song:", id);
    this.songService.getSong(id).subscribe(song => (this.song = song));
  }
}
