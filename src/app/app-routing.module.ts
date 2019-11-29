import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ItuneSearchListComponent } from "./itune-search-list/itune-search-list.component";
import { ItemViewComponent } from "./item-view/item-view.component";
import { RecordLabelComponent } from "./record-label/record-label.component";
import { ArtistViewComponent } from "./artist-view/artist-view.component";
import { PriceViewComponent } from "./price-view/price-view.component";
const routes: Routes = [
  { path: "list", component: ItuneSearchListComponent },
  { path: "item/:id", component: ItemViewComponent },
  { path: "record-label", component: RecordLabelComponent },
  { path: "price", component: PriceViewComponent },
  { path: "artist", component: ArtistViewComponent },
  { path: "item", component: ItemViewComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
