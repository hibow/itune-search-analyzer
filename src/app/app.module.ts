import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItuneSearchComponent } from './itune-search/itune-search.component';
import { ResultListComponent } from './result-list/result-list.component';

@NgModule({
  declarations: [AppComponent, ItuneSearchComponent, ResultListComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
