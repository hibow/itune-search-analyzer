import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ItuneSearchListComponent } from "./itune-search-list/itune-search-list.component";
import { ResultDetailComponent } from "./result-detail/result-detail.component";

const routes: Routes = [
  { path: "list", component: ItuneSearchListComponent },
  { path: "item/:id", component: ResultDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
